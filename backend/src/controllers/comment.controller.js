import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Comment } from "../modals/comment.modal.js"

const createComment = asyncHandler( async(req, res) => {
    const { content } = req.body;
    const { postId } = req.params;
    if(!content || !postId){
        throw new ApiError(400, "Please provide all the required fields")
    }
    const comment = await Comment.create({
        content: content,
        post: postId,
        owner: req.user._id
    })
    if(!comment){
        throw new ApiError(400, "Comment not created")
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Comment created successfully", comment)
    )
})

const updateComment = asyncHandler( async(req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    if(!content || !commentId){
        throw new ApiError(400, "Please provide all the required fields")
    }
    const comment = await Comment.findByIdAndUpdate(
        commentId,
        {
            $set: {
                content: content
            }
        },
        {new: true}
    )
    if(!comment){
        throw new ApiError(400, "Comment not updated")
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Comment updated successfully", comment)
    )
})

const deleteComment = asyncHandler( async(req, res) => {
    const { commentId } = req.params;
    if(!commentId){
        throw new ApiError(400, "Please provide all the required fields")
    }
    const comment = await Comment.findByIdAndDelete(commentId)
    if(!comment){
        throw new ApiError(400, "Comment not deleted")
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Comment deleted successfully", comment)
    )
})

const getPostComments = asyncHandler( async(req, res) => {
    const { postId } = req.params;
    if(!postId){
        throw new ApiError(400, "Please provide all the required fields")
    }
    const comments = await Comment.find({
        post: postId
    }).populate({
        path: "user",
        select: "username fullname avatar email"
    })
    if(!comments){
        throw new ApiError(400, "No comments found")
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Comments fetched successfully", comments)
    )
})

const getTweetComments = asyncHandler( async(req, res) => {
    const { tweetId } = req.params;
    if(!tweetId){
        throw new ApiError(400, "Please provide all the required fields")
    }
    const comments = await Comment.find({
        tweet: tweetId
    }).populate({
        path: "user",
        select: "username fullname avatar email"
    })
    if(!comments){
        throw new ApiError(400, "No comments found")
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Comments fetched successfully", comments)
    )
})

export {
    createComment,
    updateComment,
    deleteComment,
    getPostComments,
    getTweetComments
}