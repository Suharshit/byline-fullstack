import connetDb from './db/connectDb.js'
import dotenv from 'dotenv'
import { app } from './app.js'

dotenv.config({
    path: './.env'
})

connetDb().then(() => {
    app.on("error", (error) => {
        console.log(error);
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
}).catch((error) => {
    console.log("MongoDb connection failed error !! ",error);
})