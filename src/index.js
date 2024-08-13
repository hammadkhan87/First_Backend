// require('dotenv').config({path:"./env"})
import dotenv from "dotenv"
import mongoose from "mongoose"
import {DB_NAME} from "./constants.js"
import express from "express"
import connectDB from "./db/index.js"
dotenv.config({
    path:"./env"
})
const app =express()
connectDB().then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log("server is running on port")
    })
}).catch((err)=>{console.log("db connection error",err)})





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