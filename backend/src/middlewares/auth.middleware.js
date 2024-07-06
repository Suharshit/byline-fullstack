import { User } from "../modals/user.modal.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler( async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header(  'Authorization' )?.replace( "Bearer ", "" );

        if(!token) {
            throw new ApiError(404, "Token not found")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        if(!user) {
            throw new ApiError(404, "User not found")
        }
        req.user = user
        next()
    } catch (error) {
        throw new ApiError({
            status: 401,
            message: error?.message || "Invalid Token",
        })
    }
})