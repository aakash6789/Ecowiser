import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js"
import Note from "../models/note.model.js";
import {uploadOnCloudinary,deleteImageOnCloudinary} from '../utils/Cloudinary.js'
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

const updateImage=asyncHandler(async(req,res)=>{
    const {id}=req.body;
    console.log(id);
    const note1 = await Note.findById(id);
    const imagePath=req.file?.path;
    if(!imagePath){
        throw new ApiError(400,"Avatar file is needed");
    }
    const image=await uploadOnCloudinary(imagePath);
    console.log(image.url);
    console.log(note1.image);
    if(!image.url){
        throw new ApiError(400,"Error while uploading new Image ");
    }
    await deleteImageOnCloudinary(note1.image);
    const note=await Note.findByIdAndUpdate(note1._id,{$set:{image:image.url}},{new:true});
    // note.save();
    return res.status(200).json(new ApiResponse(200,{ id: note._id, image: note.image },"Image updated successfully"))

})

export {submitNote,updateImage};