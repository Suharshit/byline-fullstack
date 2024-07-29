import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    createTweet,
    getUserTweets,
    getAllTweets,
    getTweetById,
    deleteTweet,
    updateTweet,
    getTweetByUsenameOrContent
} from "../controllers/tweet.controller.js"

const router = Router()

router.route("/add-tweet").post(
    verifyJWT,
    createTweet
)

router.route("/update-tweet/:tweetId").patch(
    verifyJWT,
    updateTweet
)

router.route("/delete-tweet/:tweetId").get(
    verifyJWT,
    deleteTweet
)

router.route("/tweet/:tweetId").get(
    verifyJWT,
    getTweetById
)

router.route("/all-tweets").get(
    verifyJWT,
    getAllTweets
)

router.route("/user-tweets/:userId").get(
    verifyJWT,
    getUserTweets
)

router.route("/search-tweet").get(
    getTweetByUsenameOrContent
)

export default router