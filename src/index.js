// require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
// import mongoose from "mongoose";
// import {DB_NAME} from "./constants.js";
import connectMongo from "./database/index.js";
import {app} from "./app.js"
dotenv.config({
    path: './env'
})

connectMongo().then(() => {
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on : ${process.env.PORT}`); 
    })
    
}).catch((err) => {
    console.log("Connection Error !!! : ",err);
})






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