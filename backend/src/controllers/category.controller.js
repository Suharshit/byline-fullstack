import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Category } from "../modals/category.modal.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Post } from "../modals/post.modal.js"

const createCategory = asyncHandler( async(req, res) => {
    const { name, description } = req.body;
    if(!name || !description){
        throw new ApiError(400, "Please provide all the fields")
    }
    const category = await Category.create({ 
        name, 
        description 
    })
    if(!category){
        throw new ApiError(400, "Category not created")
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Category created successfully", category)
    )
})

const deleteCategory = asyncHandler( async(req, res) => {
    const { categoryId } = req.params;
    if(!categoryId){
        throw new ApiError(400, "Please provide category id")
    }
    const category = await Category.findByIdAndDelete(categoryId)
    if(!category){
        throw new ApiError(400, "Category not found")
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Category deleted successfully", category)
    )
})

const getAllCategories = asyncHandler( async(req, res) => {
    const categories = await Category.find({}).sort({
        createdAt: -1
    })
    if(!categories){
        throw new ApiError(400, "No categories found")
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Categories fetched successfully", categories)
    )
})

const updateCategory = asyncHandler( async(req, res) => {
    const { categoryId } = req.params;
    const { name, description } = req.body;
    if(!name || !description){
        throw new ApiError(400, "Please provide all the fields")
    }
    if(!categoryId){
        throw new ApiError(400, "Please provide category id")
    }
    const category = await Category.findByIdAndUpdate(
        categoryId,
        {
            $set: {
                name,
                description
            }
        },
        {
            new: true
        }
    )
    if(!category){
        throw new ApiError(400, "Category not updated")
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Category updated successfully", category)
    )
})

const togglePostCategory = asyncHandler( async(req, res) => {
    const { postId, newCategoryId } = req.params;
    const post = await Post.findById(postId);
    if(!post){
        throw new ApiError(400, "Post not found")
    }
    const category = await Category.findById(newCategoryId);
    if(!category){
        throw new ApiError(400, "Category not found")
    }
    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
            $set: {
                categoriy: newCategoryId
            }
        },
        {
            new: true
        }
    )
    if(!updatedPost){
        throw new ApiError(400, "Post not updated")
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Category updated successfully", updatedPost)
    )
})

export {
    createCategory,
    getAllCategories,
    updateCategory,
    togglePostCategory,
    deleteCategory
}