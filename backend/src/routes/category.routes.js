import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createCategory,
    getAllCategories,
    updateCategory,
    togglePostCategory,
    deleteCategory
} from "../controllers/category.controller.js"

const router = Router()

router.route("/add-category").post(
    verifyJWT,
    createCategory
)

router.route("/delete-category/:categoryId").get(
    verifyJWT,
    deleteCategory
)

router.route("/update-category/:categoryId").post(
    verifyJWT,
    updateCategory
)

router.route("/toggle-post-category/:postId/:newCategoryId").get(
    verifyJWT,
    togglePostCategory
)

router.route("/all-category").get(
    verifyJWT,
    getAllCategories
)

export default router