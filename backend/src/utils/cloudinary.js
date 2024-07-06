import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import { ApiError } from "./ApiError.js";
import { ApiResponse } from "./ApiResponse.js";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async(localFilePath) => {
    try {
        if(!localFilePath) return null
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        if(result){
            fs.unlinkSync(localFilePath)
        }
        return result;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}

const deleteFromCloudinary = async(url) => {
    try {
        const indexone = url.lastIndexOf("/")
        const indexTwo = url.lastIndexOf(".")
        const publicId = url.slice(indexone + 1, indexTwo)
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: "auto"
        })
        if(!result){
            throw new ApiError(500, "Error while deleting image")
        }
        return new ApiResponse(200, "images deleted succesfully")
    } catch (error) {
        throw new ApiError(500, "error while deleting file")
    }
}

export { 
    uploadOnCloudinary,
    deleteFromCloudinary
}