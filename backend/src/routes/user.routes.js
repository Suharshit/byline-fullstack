import { Router } from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {
    userRegister,
    userLogin,
    userLogout,
    refreshAccesstoken,
    getCurrentUser,
    resetUserPassword,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserProfile
} from "../controllers/user.controller.js"

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    userRegister
)

router.route("/login").post(
    userLogin
)

router.route("/logout").post(
    verifyJWT,
    userLogout
)

router.route("/refresh-token").post(
    verifyJWT,
    refreshAccesstoken
)

router.route("/current-user").get(
    verifyJWT,
    getCurrentUser
)

router.route("/reset-password").post(
    verifyJWT,
    resetUserPassword
)

router.route("/update-account").patch(
    verifyJWT,
    updateAccountDetails
)

router.route("/avatar").patch(
    verifyJWT,
    upload.single("avatar"),
    updateUserAvatar
)

router.route("/cover-image").patch(
    verifyJWT,
    upload.single("coverImage"),
    updateUserCoverImage
)

router.route("/profile/:username").get(
    verifyJWT,
    getUserProfile
)

export default router