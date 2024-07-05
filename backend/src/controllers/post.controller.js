import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Post } from "../modals/post.modal.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const createPost = asyncHandler( async(req, res) => {
    const { title, description, content, category } = req.body;
    if(
        [title, description, content].some((feilds) => {
            return feilds.trim() === ""
        })
    ){
        throw new ApiError(400, "All fields are required");
    }
    if(!category){
        throw new ApiError(400, "Category is required");
    }
    let postImageLocalPath;
    if(req.file && req.file.postImage){
        postImageLocalPath = req.file.postImage;
    }
    const postImage = await uploadOnCloudinary(postImageLocalPath)
    if(!postImage){
        throw new ApiError(400, "Image upload failed")
    }
    const post = await Post.create({
        title,
        description,
        content,
        image: postImage || "",
        author: req.user,
        category: category
    })
    if(!post){
        throw new ApiError(500, "Post creation failed")
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Post created successfully", post)
    )
})

const updatePost = asyncHandler( async(req, res) => {
    const { title, description, content, category } = req.body;
    const { postId } = req.params;
    if(
        [title, description, content].some((feilds) => {
            return feilds.trim() === ""
        })
    ){
        throw new ApiError(400, "All fields are required");
    }
    if(!category){
        throw new ApiError(400, "Category is required");
    }
    if(!postId){
        throw new ApiError(400, "Post id is required")
    }
    const post = await Post.findByIdAndUpdate(
        postId,
        {
            $set: {
                title: title,
                description: description,
                content: content,
                category: category
            }
        },
        {
            new: true
        }
    )
    if(!post){
        throw new ApiError(500, "Post update failed")
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Post updated successfully", post)
    )
})

const deletePost = asyncHandler( async(req, res) => {
    const { postId } = req.params;
    if(!postId){
        throw new ApiError(400, "Post id is required")
    }
    const post = await Post.findByIdAndDelete(postId)
    if(!post){
        throw new ApiError(500, "Post delete failed")
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Post deleted successfully", post)
    )
})

const getPostById = asyncHandler( async(req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if(!post){
        throw new ApiError(404, "Post not found")
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Post fetched successfully", post)
    )
})

const seachPosts = asyncHandler( async(req, res) => {
    const { search } = req.query;
    const posts = await Post.find({ title: { $regex: search, $options: "i"}})
    if(!posts){
        throw new ApiError(404, "No posts found")
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Posts fetched successfully", posts)
    )
})

const getUserPosts = asyncHandler( async( req, res ) => {
    const { userId } = req.params;
    const posts = await Post.find({ author: userId })
    if(!posts){
        throw new ApiError(404, "No posts found")
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "User Posts fetched successfully", posts)
    )
})

const getAllPosts = asyncHandler( async(req, res) => {
    const { page = 1, limit = 10 } = req.query
    const posts = await Post.find().sort({ createdAt: -1 }).limit(limit).skip(
        page * limit - limit
    )
    if(!posts){
        throw new ApiError(404, "No posts found")
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Posts fetched successfully", posts)
    )
})

const getPostsByCategory = asyncHandler( async(req, res) => {
    const { category } = req.params;
    if(!category){
        throw new ApiError(404, "No category found")
    }
    const posts = await Post.find({ category: category }).sort(
        { createdAt: -1 }
    )
    if(!posts){
        throw new ApiError(404, "No posts found")
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Posts fetched successfully", posts)
    )
})

export {
    createPost,
    updatePost,
    deletePost,
    getPostById,
    seachPosts,
    getUserPosts,
    getAllPosts,
    getPostsByCategory
}