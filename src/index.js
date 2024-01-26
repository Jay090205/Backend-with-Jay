// require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
// import mongoose from "mongoose";
// import {DB_NAME} from "./constants.js";
import connectMongo from "./database/index.js";
dotenv.config({
    path: './env'
})


connectMongo()






// import express from  "express";
// const app = express();
// (async ()=>{
//     try {
//         mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
//         app.on("error",(error)=>{
//             console.log("Error : ",error);
//           
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log(`Server listening on ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.log(error)
//        
//     }
// })()