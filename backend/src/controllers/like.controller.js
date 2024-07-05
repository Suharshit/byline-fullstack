import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Like } from "../modals/like.modal.js"

const togglePostLike = asyncHandler( async(req, res) => {
    const { postId } = req.params
    if(!postId){
        throw new ApiError(400, "Post id is required")
    }
    const isLiked = await Like.findOne({
        $and: [
            { post: postId },
            { user: req.user._id }
        ]
    })
    if(!isLiked){
        const like = await Like.create({
            post: postId,
            user: req.user._id
        })
        if(!like){
            throw new ApiError(500, "Internal server error")
        }
        return res.status(200)
        .json(
            new ApiResponse(200, "Post liked successfully", like)
        )
    }
    const removeLike = await Like.findByIdAndDelete(
        isLiked._id
    )
    if(!removeLike){
        throw new ApiError(500, "Internal server error")
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Post unliked successfully", removeLike)
    )
})

const toggleTweetLike = asyncHandler( async(req, res) =>{
    const { tweetId } = req.params
    if(!tweetId){
        throw new ApiError(400, "Tweet id is required")
    }
    const isLiked = await Like.findOne({
        $and: [
            { tweet: tweetId },
            { user: req.user._id }
        ]
    })
    if(!isLiked){
        const like = await Like.create({
            tweet: tweetId,
            user: req.user._id
        })
        if(!like){
            throw new ApiError(500, "Internal server error")
        }
        return res.status(200)
        .json(
            new ApiResponse(200, "Tweet liked successfully", like)
        )
    }
    const removeLike = await Like.findByIdAndDelete(
        isLiked._id
    )
    if(!removeLike){
        throw new ApiError(500, "Internal server error")
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Tweet unliked successfully", removeLike)
    )
})

const toggleCommentLike = asyncHandler( async(req, res) => {
    const { commentId } = req.params
    if(!commentId){
        throw new ApiError(400, "Comment id is required")
    }
    const isLiked = await Like.findOne({
        $and: [
            { comment: commentId },
            { user: req.user._id }
        ]
    })
    if(!isLiked){
        const like = await Like.create({
            comment: commentId,
            user: req.user._id
        })
        if(!like){
            throw new ApiError(500, "Internal server error")
        }
        return res.status(200)
        .json(
            new ApiResponse(200, "Comment liked successfully", like)
        )
    }
    const removeLike = await Like.findByIdAndDelete(
        isLiked._id
    )
    if(!removeLike){
        throw new ApiError(500, "Internal server error")
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Comment unliked successfully", removeLike)
    )
})

const GetUserLikedPosts = asyncHandler( async(req, res) => {
    const { userId } = req.params
    if(!userId){
        throw new ApiError(400, "User id is required")
    }
    const likedPosts = (await Like.find({
        $and: [
            { user: userId },
            { post: { $exists: true, $ne: null } }
        ]
    }))
    if(!likedPosts){
        throw new ApiError(404, "No posts found")
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Posts found successfully", likedPosts)
    )
})

export {
    GetUserLikedPosts,
    toggleCommentLike,
    togglePostLike,
    toggleTweetLike
}