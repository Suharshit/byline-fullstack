import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createComment,
    updateComment,
    deleteComment,
    getPostComments,
    getTweetComments,
    createTweetComment
} from "../controllers/comment.controller.js"

const router = Router()

router.route("/add-comment/:postId").post(
    verifyJWT,
    createComment
)

router.route("/add-tweet-comment/:tweetId").post(
    verifyJWT,
    createTweetComment
)

router.route("/update-comment/:commentId").post(
    verifyJWT,
    updateComment
)

router.route("/delete-comment/:commentId").get(
    verifyJWT,
    deleteComment
)

router.route("/post-comments/:postId").get(
    verifyJWT,
    getPostComments
)

router.route("/tweet-comments/:tweetId").get(
    verifyJWT,
    getTweetComments
)

export default router