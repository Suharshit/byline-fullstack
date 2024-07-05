import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler }  from "../utils/asyncHandler.js";
import { Subscription } from "../modals/subscription.modal.js";

const toggleSubscription = asyncHandler( async(req, res) => {
    const { authorId } = req.params;
    if(!authorId){
        throw new ApiError(400, "Author Id is required");
    }
    const following = await Subscription.findOne({
        $and: [
            { author: authorId },
            { subscriber: req.user._id }
        ]
    })
    if(!following){
        if(authorId.toString() === req.user.id.toString()){
            throw new ApiError(400, "You can't follow yourself");
        }
        const follow = await Subscription.create({
            author: authorId,
            subscriber: req.user._id
        })
        if(!follow){
            throw new ApiError(500, "Unable to follow author");
        }
        return res.status(200)
        .json(
            new ApiResponse(200, "Successfully followed author", follow)
        )
    }
    const removeFollow = await Subscription.findByIdAndDelete(following._id)
    if(!removeFollow){
        throw new ApiError(500, "Unable to unfollow author");
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Successfully unfollowed author", removeFollow)
    )
})

const getUserFollower = asyncHandler( async(req, res) => {
    const { authorId } = req.params;
    if(!authorId){
        throw new ApiError(400, "Author Id is required");
    } 
    const followers = await Subscription.find({
        author: authorId
    }).sort({
        createdAt: -1
    })
    if(!followers){
        throw new ApiError(404, "No followers found");
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Successfully fetched followers", followers)
    )
})

const getUserFollowing = asyncHandler( async(req, res) =>{
    const { authorId } = req.params;
    if(!authorId){
        throw new ApiError(400, "Author Id is required");
    }
    const following = await Subscription.find({
        subscriber: authorId
    })
    .sort({
        createdAt: -1
    })
    if(!following){
        throw new ApiError(404, "No following found");
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "Successfully fetched following", following)
    )
})

export {
    toggleSubscription,
    getUserFollower,
    getUserFollowing
}