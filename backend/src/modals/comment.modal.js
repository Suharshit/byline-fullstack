import mongoose, { Schema } from "mongoose"

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
    },
    tweet: {
        type: Schema.Types.ObjectId,
        ref: 'Tweet',
    }
}, {
    timestamps: true
})

export const Comment = mongoose.model("Comment", commentSchema)