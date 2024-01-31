import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app=express();

app.use(cors({
    origin: process.env.CORS_OR
}))
app.use(express.json({
    limit:"20 kb"
}))
app.use(express.urlencoded());
app.use(express.static("public"))
app.use(cookieParser())

//Routes import (video 12)
import router from "./routes/user.routes.js";

app.use("/api/v1/users",router)
//  http://localhost:800/api/v1/users/register
export  {app}   