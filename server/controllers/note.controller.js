import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js"
import Note from "../models/note.model.js";
import {uploadOnCloudinary} from '../utils/Cloudinary.js'
const submitNote=asyncHandler(async(req,res)=>{
    const {Tittle,Content,isPinned,image}=req.body;
    console.log(req.file);
    const imgPath=req.file?.path;
    console.log(imgPath);
    
    let cloudImage;
    if(imgPath){
    cloudImage=await uploadOnCloudinary(imgPath);
    console.log(cloudImage);
   if(!cloudImage){
    throw new ApiError(400,"Avatar file is needed");
   }
}
const createdNote =await Note.create({
    Tittle,
    Content,
    isPinned,
    image:cloudImage?.url
});
createdNote.save();
if(!createdNote){
    throw new ApiError(500,"Something went wrong");
   }
   return res.status(201).json(
    new ApiResponse(200,createdNote,"Note added sucessfully")
   )
})

export {submitNote};