import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { LIMIT } from "./constants.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({
    limit: LIMIT
}))

app.use(express.urlencoded({
    extended: true,
    limit: LIMIT
}))

app.use(express.static("public"))

app.use(cookieParser())


// import router
import userRouter from "./routes/user.routes.js"
import postRouter from "./routes/post.routes.js"
import tweetRouter from "./routes/tweet.routes.js"
import likeRouter from "./routes/like.routes.js"
import commentRouter from "./routes/comment.routes.js"
import categoryRouter from "./routes/category.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"

// routes usage
app.use('/api/v1/user', userRouter)
app.use('/api/v1/post', postRouter)
app.use('/api/v1/tweet', tweetRouter)
app.use('/api/v1/like', likeRouter)
app.use('/api/v1/comment', commentRouter)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/subscription', subscriptionRouter)

export { app }