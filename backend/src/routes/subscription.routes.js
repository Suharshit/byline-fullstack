import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    toggleSubscription,
    getUserFollower,
    getUserFollowing
} from "../controllers/subscription.controller.js"

const router = Router()

router.route("/toggle-subscription/:authorId").get(
    verifyJWT,
    toggleSubscription
)

router.route("/user-follwers/:authorId").get(
    verifyJWT,
    getUserFollower
)

router.route("/user-following/:authorId").get(
    verifyJWT,
    getUserFollowing
)

export default router