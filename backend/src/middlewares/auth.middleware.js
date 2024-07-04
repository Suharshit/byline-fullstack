import { User } from "../modals/user.modal";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler( async(req, res, next) => {
    try {
        const Token = req.cookie?.accessToken || req.header(  'Authorization' )?.replace("Bearer ", "");
        if(!Token) {
            throw new ApiError(404, "Token not found")
        }
        const decoded = jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.id).select("-password -refreshToken");
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