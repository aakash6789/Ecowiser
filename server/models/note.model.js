import mongoose from "mongoose";

const notesSchema=new mongoose.Schema({
    Tittle:{
        type:String,
        require:true
    },
    Content:{
        type:String,
        require:true
    },
    isPinned:{
        type:Boolean,
        default:false
    },
    image:{
        type:String
    }
},{timestamps:true});

const Note=mongoose.model('Note',notesSchema);
export default Note;