import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js"
import Note from "../models/note.model.js";

const submitNote=asyncHandler(async(req,res)=>{
    const {Tittle,Content,isPinned,image}=req.body;
    const note =await Note.create({
        Tittle,
        Content,
        isPinned,
        image
    });
    note.save();
})