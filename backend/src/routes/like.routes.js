import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    GetUserLikedPosts,
    toggleCommentLike,
    togglePostLike,
    toggleTweetLike
} from "../controllers/like.controller.js"

const router = Router()

router.route("/toggle-post-like/:postId").get(
    verifyJWT,
    togglePostLike
)

router.route("/toggle-tweet-like/:tweetId").get(
    verifyJWT,
    toggleTweetLike
)

router.route("/toggle-comment-like/:commentId").get(
    verifyJWT,
    toggleCommentLike
)

router.route("/user-liked-posts/:userId").get(
    verifyJWT,
    GetUserLikedPosts
)

export default router