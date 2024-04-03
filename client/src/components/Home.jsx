import React from 'react'
import { useState,useEffect,useMemo } from 'react';
import { FaImage } from "react-icons/fa";
import { TiPinOutline,TiPin} from "react-icons/ti";
import toast from "react-hot-toast";
import axios from "axios";
import { SERVER_URL } from '../constants/constant';
const Home = () => {
    const formData=useMemo(()=>new FormData(),[]);
    const [isPinned,setIsPinned]=useState(false);
    const [tittle,setTittle]=useState("");
    const [content,setContent]=useState("");
    const[image,setImage]=useState(null);
    // const [formData, setFormData] = useState(new FormData());
    const handleImageChange=(e)=>{
        const file=e.target.files[0].name;
        console.log(file);
       setImage(file);
    }
    const submitNote=async(e)=>{
        e.preventDefault(); 
         formData.append('image',image);
         formData.append('Tittle',tittle);
         formData.append('Content',content);
         console.log(formData);
         for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
         saveNote(formData);
         

    }
    const saveNote=async(formData)=>{
        try {
            
            const response=await fetch(`http://localhost:3000/api/v1/notes/submit`,{method:"POST",body:formData});
            console.log(response.data);
            toast.success("New Note added sucessfully!!");
        } catch (error) {
            console.log("Error while adding a note",error);
            toast.error("Note didn't add, Try Again!!")
        }
    }

    
  return (
    <div className='mt-[5%]  '>
      <div className=' border-gray-400 border-[2px] mx-[30%] md:h-[42vh] max-sm:h-auto pt-2 px-2'>
        <input type='text' className='w-full focus:outline-none h-[10%]' placeholder='Tittle' onChange={(e)=>setTittle(e.target.value)}></input>
        <textarea type='text' className='w-full focus:outline-none h-[70%] mt-[3%]' placeholder='Write a note...' onChange={(e)=>setContent(e.target.value)}></textarea>
        <div className='flex px-4 relative h-[4vh] justify-between'>
            <div className='mt-1'>
                <button onClick={()=>setIsPinned(!isPinned)}>
       {isPinned? <TiPin/>: <TiPinOutline  />}
        </button>
        </div>
        <div className='mt-1'>
            <input type="file" className='absolute w-[10%] opacity-0' onChange={handleImageChange} />
        <FaImage />
        </div>
        {/* <button className=''>Save</button> */}
        <button className='text-white  bg-black rounded-lg sm:px-2 max-sm:px-2 p-1 max-sm:py-0  text-[2vh] max-sm:text-[1vh]' onClick={submitNote}>Save</button>
        </div>
        
      </div>
    </div>
  )
}

export default Home
