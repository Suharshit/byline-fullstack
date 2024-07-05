import mongoose, { Schema } from "mongoose"

const likeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    tweet: {
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }
},{
    timestamps: true
})

export const Like = mongoose.model("Like", likeSchema)