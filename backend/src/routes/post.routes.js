import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
    createPost,
    updatePost,
    deletePost,
    getPostById,
    seachPosts,
    getUserPosts,
    getAllPosts,
    getPostsByCategory
} from "../controllers/post.controller.js"

const router = Router()

router.route("/add-post").post(
    verifyJWT,
    upload.single("image"),
    createPost
)

router.route("/update-post/:postId").patch(
    verifyJWT,
    updatePost
)

router.route("/delete-post/:postId").get(
    verifyJWT,
    deletePost
)

router.route("/post-by-id/:postId").get(
    verifyJWT,
    getPostById
)

router.route("/search-post").get(
    seachPosts
)

router.route("/user-posts/:postId").get(
    verifyJWT,
    getUserPosts
)

router.route("/all-posts").get(
    getAllPosts
)

router.route("/posts/:category").get(
    getPostsByCategory
)

export default router