import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDb = async () => {
    try {
        const connectioInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDb connected !! DB HOST: ${connectioInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection failed error :: ", error)
        process.exit(1)
    }
}

export default connectDb