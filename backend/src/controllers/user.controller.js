import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../modals/user.modal.js"
import { deleteFromCloudinary, uploadOnCloudinary } from  "../utils/cloudinary.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId)

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({
            validateBeforeSave: false
        })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError({
            status: 500,
            message: "Internal Server Error"
        })
    }
}

const userRegister = asyncHandler( async(req, res) => {
    const { username, fullname, email, password } = req.body
    if(
        [username, fullname, email, password].some((feilds) => {
            return feilds?.trim() === ""
        })
    ){
        throw new ApiError({
            status: 400,
            message: "All fields are required"
        })
    }
    const checkUserExist = await User.findOne({
        $or: [ { username }, { email } ]
    })
    if(checkUserExist) {
        throw new ApiError({
            status: 400,
            message: "User already exist"
        })
    }
    let avatarLocalPath;
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files?.avatar)  && req.files?.avatar.length > 0) {
        avatarLocalPath = req.files.avatar[0].path
    }
    if(req.files && Array.isArray(req.files?.coverImage)  && req.files?.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    //  upload on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    
    const user = await User.create({
        username: username,
        fullname: fullname,
        email: email,
        password: password,
        bio: "",
        avatar: avatar?.url || '',
        coverImage: coverImage?.url || '',
    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError({
            status: 400,
            message: "User not created"
        })
    }
    res.status(200).json(
        new ApiResponse({
            status: 200,
            message: "User created successfully",
            data: createdUser
        })
    )
})

const userLogin = asyncHandler( async(req, res) => {
    const { email, username, password } = req.body
    if(!email && !username) {
        throw new ApiError({
            status: 400,
            message: "Please provide email or username"
        })
    }
    const user = await User.findOne({ 
        $or: [{ email }, { username }] 
    })
    if(!user) {
        throw new ApiError({
            status: 400,
            message: "Invalid credentials user does not exist"
        })
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if(!isPasswordCorrect) {
        throw new ApiError({
            status: 400,
            message: "Invalid credentials password does not match"
        })
    }
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refrehToken")

    // send cookies
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse({
        status: 200,
        message: "User logged in successfully",
        data: loggedInUser, accessToken, refreshToken
    }))
})

const userLogout = asyncHandler( async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res.status(200)
    .cookie("accessToken", options)
    .cookie("refreshToken", options)
    .json(new ApiResponse({
        status: 200,
        message: "User logged out successfully"
    }))
})

const refreshAccesstoken = asyncHandler( async(req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if(!incomingRefreshToken) {
        throw new ApiError({
            status: 400,
            message: "Unautorized request"
        })
    }
    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)
        if(!user){
            throw new ApiError({
                status: 400,
                message: "Invalid RefeshToken"
            })
        }
        if(incomingRefreshToken !== user?.refreshToken){
            new ApiError({
                status: 400,
                message: "Refresh Token is Expired"
            })
        }
        const options = {
            httpOnly: true,
            secure: true,
        }
        const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id)
        return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(new ApiResponse({
            status: 200,
            message: "Refresh Token Generated Successfully",
            data: {
                accessToken: accessToken,
                refreshToken: newRefreshToken
            }
        }))
    } catch (error) {
        throw new ApiError({
            status: 400,
            message: "Invalid Refresh Token"
        })
    }
})

const getCurrentUser = asyncHandler( async(req, res) => {
    return res.status(200)
    .json(new ApiResponse({
        status: 200,
        message: "User fetched successfully",
        data : req.user
    }))
})

const resetUserPassword = asyncHandler( async(req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body
    if(newPassword !== confirmPassword){
        throw new ApiError({
            status: 400,
            message: "New Password and Confirm Password does not match"
        })
    }
    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = user.isPasswordCorrect(oldPassword)
    if(!isPasswordCorrect){
        throw new ApiError({
            status: 400,
            message: "Old Password is incorrect"
        })
    }
    user.password = newPassword
    await user.save({
        validateBeforeSave: false
    })
    return res.status(200)
    .json(new ApiResponse({
        status: 200,
        message: "Password Reset Successfully"
    }))
})

const updateAccountDetails = asyncHandler( async(req, res) => {
    const { fullname, email, bio } = req.body;
    if([fullname, email, bio].some((feilds) => {
        return feilds.trim() === ""
    })){
        throw new ApiError({
            status: 400,
            message: "Please provide all the fields"
        })
    }
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullname,
                email,
                bio
            }
        },
        {
            new: true,
        }
    ).select("-password -refreshToken")

    return res.status(200)
    .json(new ApiResponse({
        status: 200,
        message: "Account Details Updated Successfully",
        data: user
    }))
})

const updateUserAvatar = asyncHandler( async(req, res) => {
    const avatarLocalPath = req.file?.path
    const oldAvatarUrl = req.user?.avatar

    if(!avatarLocalPath){
        throw new ApiError({
            status: 400,
            message: "Please provide an avatar"
        })
    }
    // delete old avatar
    // if(oldAvatarUrl){
    //     await deleteFromCloudinary(oldAvatarUrl)
    // }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if(!avatar.url){
        throw new ApiError({
            status: 500,
            message: "Error uploading avatar"
        })
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        {
            new: true,
        }
    ).select("-password -refreshToken")
    return res.status(200)
    .json(new ApiResponse({
        status: 200,
        message: "Avatar Updated Successfully",
        data: user
    }))
})

const updateUserCoverImage = asyncHandler( async(req, res) => {
    const coverImageLocalPath = req.file?.path
    const oldCoverImageUrl = req.user?.coverImage

    if(!coverImageLocalPath){
        throw new ApiError({
            status: 400,
            message: "Please provide an avatar"
        })
    }
    // delete old avatar
    // if(oldCoverImageUrl){
    //     await deleteFromCloudinary(oldCoverImageUrl)
    // }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if(!coverImage.url){
        throw new ApiError({
            status: 500,
            message: "Error uploading avatar"
        })
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage: coverImage.url
            }
        },
        {
            new: true,
        }
    ).select("-password -refreshToken")
    return res.status(200)
    .json(new ApiResponse({
        status: 200,
        message: "coverImage Updated Successfully",
        data: user
    }))
})

const getUserProfile = asyncHandler( async(req, res) => {
    const { username } = req.params;
    if(!username){
        throw new ApiError(400, "Please provide a username")
    }
    const profile = await User.aggregate([
        {
            $match: {
                username: username?.toLowerCase()
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "author",
                as: "followers"
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "following"
            }
        },
        {
            $addFields: {
                followers: {
                    $size: "$followers"
                },
                following: {
                    $size: "$following"
                },
                isFollowing: {
                    $cond: {
                        if: {
                            $in: [req.user?._id, "$followers.subscriber"]   
                        },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                _id: 1,
                username: 1,
                fullname: 1,
                email: 1,
                bio: 1,
                avatar: 1,
                coverImage: 1,
                followers: 1,
                following: 1,
                isFollowing: 1
            }
        }
    ])
    if(!profile.length){
        throw new ApiError(404, "User Profile not found")
    }
    return res.status(200)
    .json(
        new ApiResponse({
            status: 200,
            message: "User Profile fetched successfully",
            data: profile[0]
        })
    )
})

const searchUsers = asyncHandler( async(req, res) => {
    const { search } = req.query
    const users = await User.find({ 
        $or: [
            { username: { $regex: search, $options: "i" } },
            { fullname: { $regex: search, $options: "i" } }
        ]
    }).select("-password")
    if(!users) {
        throw new ApiError(404, "User not found")
    }
    return res.status(200)
    .json(
        new ApiResponse(200, "users fetched succesfully", users)
    )
})

export { 
    userRegister,
    userLogin,
    userLogout,
    refreshAccesstoken,
    getCurrentUser,
    resetUserPassword,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserProfile,
    searchUsers
}