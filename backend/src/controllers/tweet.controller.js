import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Tweet } from "../modals/tweet.modal.js";
import mongoose from "mongoose";

const createTweet = asyncHandler( async(req, res) => {
    const { content } = req.body;
    if(!content){
        throw new ApiError(400, "Content is required");
    }
    const tweet = await Tweet.create({ content, owner: req.user._id });
    if(!tweet){
        throw new ApiError(400, "Tweet not created");
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Tweet created successfully", tweet)
    )
})

const updateTweet = asyncHandler( async(req, res) => {
    const { content } = req.body;
    const { tweetId } = req.params;
    if(!content || !tweetId){
        throw new ApiError(400, "Content and tweetId are required");
    }
    const tweet = await Tweet.findByIdAndUpdate(
        tweetId,
        {
            $set: {
                content: content,
            }
        },
        {
            new: true,
        }
    ).sort(
        { createdAt: -1 }
    )
    if(!tweet){
        throw new ApiError(400, "Tweet not updated");
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Tweet updated successfully", tweet)
    )
})

const deleteTweet = asyncHandler( async(req, res) => {
    const { tweetId } = req.params;
    if(!tweetId){
        throw new ApiError(400, "TweetId is required");
    }
    const tweet = await Tweet.findByIdAndDelete(tweetId)
    if(!tweet){
        throw new ApiError(400, "Tweet not deleted");
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Tweet deleted successfully", tweet)
    )
})

const getTweetById = asyncHandler( async(req, res) => {
    const { tweetId } = req.params;
    if(!tweetId){
        throw new ApiError(400, "TweetId is required");
    }
    const tweet = await Tweet.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(tweetId)
            }
        },
        {
            $lookup: {
                from: 'likes',
                localField: '_id',
                foreignField: 'tweet',
                as: 'likes'
            }
        },
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'tweet',
                as: 'comments'
            }
        },
        {
            $addFields: {
                likesCount: { $size: "$likes" },
                commentsCount: { $size: "$comments" },
                isLiked: {
                    $cond: {
                        if: { $in: [req.user._id, "$likes.user"] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                _id: 1,
                content: 1,
                owner: 1,
                createdAt: 1,
                likesCount: 1,
                commentsCount:1,
                isLiked: 1
            }
        }
    ])

    await Tweet.populate(tweet, {
        path: 'owner',
        select: 'username avatar fullname'
    })
    if(!tweet){
        throw new ApiError(400, "Tweet not found");
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Tweet found successfully", tweet[0])
    )
})

const getAllTweets = asyncHandler( async(req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const tweets = await Tweet.aggregate([
        {
            $sort: { createdAt: -1 }
        },
        {
            $skip: (page - 1) * limit
        },
        {
            $lookup : {
                from: "likes",
                localField: "_id",
                foreignField: "tweet",
                as: "likes"
            }
        },
        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "tweet",
                as: "comments"
            }
        },
        {
            $addFields: {
                likesCount: { $size: "$likes" },
                commentsCount: { $size: "$comments" },
                isLiked: {
                    $cond: {
                        if: { $in: [req.user._id, "$likes.user"] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                _id: 1,
                owner: 1,
                content: 1,
                likesCount: 1,
                commentsCount: 1,
                isLiked: 1,
                createdAt: 1
            }
        }
    ])

    await Tweet.populate(tweets, {
        path: 'owner',
        select: 'fullname username avatar'
    })
    if(!tweets){
        throw new ApiError(400, "Tweets not found");
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Tweets found successfully", tweets)
    )
})

const getTweetByUsenameOrContent = asyncHandler( async(req, res) => {
    const { search, page = 1, limit = 10 } = req.query;
    const tweets = await Tweet.aggregate([
        {
            $match: {
                $or: [
                    { username: { $regex: search, $options: "i" } },
                    { content: { $regex: search, $options: "i" } }
                ]
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $limit: limit
        },
        {
            $project: {
                _id: 1,
                owner: 1,
                content: 1,
                createdAt: 1,
            }
        }
    ]).skip(
        (page - 1) * limit
    )

    await Tweet.populate(tweets, {
        path: "owner",
        select: "fullname username avatar"
    })
    if(!tweets){
        throw new ApiError(400, "Tweets not found");
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Tweets found successfully", tweets)
    )
})

const getUserTweets = asyncHandler( async(req, res) => {
    const { userId } = req.params;
    const { limit = 10 , page = 1 } = req.query;
    const tweets = await Tweet.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(userId)
            },
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "tweet",
                as: "likes"
            }
        },
        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "tweet",
                as: "comments"
            }
        },
        {
            $addFields: {
                likesCount: { $size: "$likes" },
                likes: {
                    $map: {
                        input: "$likes",
                        as: "like",
                        in: "$$like.user"
                    }
                },
                commentsCount: { $size: "$comments" },
                comments: {
                    $map: {
                        input: "$comments",
                        as: "comment",
                        in: "$$comment.user"
                    }
                },
                isLiked: {
                    $cond: {
                        if: { $in: [req.user._id, "$likes.user"] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                owner: 1,
                content: 1,
                _id: 1,
                createdAt: 1,
                likesCount: 1,
                isLiked: 1,
                commentsCount: 1,
                likes: 1,
                comments: 1,
            }
        }
    ])
    .sort({ createdAt: -1 })
    .exec();
    await Tweet.populate(tweets, {
        path: "owner",
        select: "username fullname avatar"
    })
    
    if(!tweets){
        throw new ApiError(400, "Tweets not found");
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Tweets found successfully", tweets)
    )
})

export {
    createTweet,
    getUserTweets,
    getAllTweets,
    getTweetById,
    deleteTweet,
    updateTweet,
    getTweetByUsenameOrContent
}