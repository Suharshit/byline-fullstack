import mongoose, { Schema} from "mongoose"

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        min: [10, "title must be atleast 10 charachters"],
        index: true
    },
    content: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    views: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    }
}, {
    timestamps: true
})

export const Post = mongoose.model("Post", postSchema)