import fs from "fs";
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadfileoncloud = async (localpath) =>{
    try{
        if (!localpath) {return null}
        const response =  await cloudinary.uploader.upload(localpath,{
        resource_type:"auto"
        })
        console.log("File successfully upload!!!!!!!!",response.url)
        return response;
    }
    catch(err){
        fs.unlinkSync(localpath)
        return null;
    }

}

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });


export {uploadfileoncloud}