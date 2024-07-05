import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Tweet } from "../modals/tweet.modal.js";

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
    const tweet = await Tweet.findById(tweetId).sort({ createdAt: -1 })
    if(!tweet){
        throw new ApiError(400, "Tweet not found");
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Tweet found successfully", tweet)
    )
})

const getAllTweets = asyncHandler( async(req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const tweets = await Tweet.find().sort({
        createdAt: -1
    }).limit(limit).skip(
        (page - 1) * limit
    )
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
    const tweets = await Tweet.find({ 
        owner: userId 
    }).sort({ 
        createdAt: -1 
    })
    .limit(limit)
    .skip(
        (page - 1) * limit
    )
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