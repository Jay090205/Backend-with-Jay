import mongoose from "mongoose";

import {DB_NAME} from "../constants.js";

const connectMongo = async () =>{
    try {
        //Mongoodb return object to variable
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
       console.log(`\n MongooDB Connect !! DB Host : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongooDb Failed : ",error);
        process.exit(1)
    }
}

export default connectMongo