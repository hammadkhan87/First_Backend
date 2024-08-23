// require('dotenv').config({path:"./env"})
import dotenv from "dotenv"
import mongoose from "mongoose"
import {DB_NAME} from "./constants.js"
import express from "express"
import connectDB from "./db/index.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import {app} from "./app.js"
dotenv.config({
    path:"./.env"
})
// const app =express()
connectDB().then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log("server is running on port")
    })
}).catch((err)=>{console.log("db connection error",err)})


// app.use(cors({
//     origin:process.env.CORS_ORIGIN,
//     credentials:true
// }))
// app.use(express.json({limit:"16kb"}))
// app.use(express.urlencoded({extended:true,limit:"16kb"}))
// app.use(express.static("public"))
// app.use(cookieParser())

// //routes import
// import userRouter from "./routers/user.routes.js"
// //routs decalaration
// // app.use("/users",userRouter)
//  app.use("/api/v1/users",userRouter)


// function connectDB(){}
//connectDB()
// Method First to connect with database...
// ;(async()=>{
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//        app.on("error",(error)=>{console.log("error")
//         throw error
//        })
//      app.listen(process.env.PORT,()=>
//         {console.log(`app is listing on port: ${process.env.PORT} `)})
//     } catch (error) {
//         console.error("Error :",error)

//     }
// })()