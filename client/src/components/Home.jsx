import React from 'react'
import { useState,useEffect,useMemo } from 'react';
import { FaImage } from "react-icons/fa";
import { TiPinOutline,TiPin} from "react-icons/ti";
import toast from "react-hot-toast";
import {useForm,Controller} from 'react-hook-form';
import axios from "axios";
import { SERVER_URL } from '../constants/constant';
const Home = () => {
    const formData=new FormData();
    const {
      register,
      handleSubmit,control,
      formState: { errors },reset
    } = useForm();
    const [isPinned,setIsPinned]=useState(false);
    // const [tittle,setTittle]=useState("");
    // const [content,setContent]=useState("");
    // const[image,setImage]=useState(null);
    // const [formData, setFormData] = useState(new FormData());
    // const handleImageChange=(e)=>{
    //     const file=e.target.files[0].name;
    //     console.log(file);
    //    setImage(file);
    // }
    const onSubmit=async(data,e)=>{
        e.preventDefault(); 
        data.file = e.target.file.files;
        console.log(data);
         formData.append('image',data.file[0]);
         formData.append('Tittle',data.tittle);
         formData.append('Content',data.content);
         formData.append('isPinned',isPinned);
         console.log(formData);
         for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
         saveNote(formData);
         

    }
    const onError=()=>{
      console.log("enter again");
      toast.error("Error while submitting form");
    }
    const saveNote=async(formData)=>{
        try {
            
            const response=await fetch(`http://localhost:3000/api/v1/notes/submit`,{method:"POST",
            body:formData});
            console.log(response);
            toast.success("New Note added sucessfully!!");
           setIsPinned(false);
           reset();
            
        } catch (error) {
            console.log("Error while adding a note",error);
            toast.error("Note didn't add, Try Again!!")
        }
    }

    
  return (
    <div className='mt-[5%]  '>
      <div className=' border-gray-400 border-[2px] mx-[30%] md:h-[42vh] max-sm:h-auto pt-2 px-2'>
      <form action="" className='h-[90%]' onSubmit={handleSubmit(onSubmit,onError)} encType='multipart/formData'>
        <input type='text' id='tittle' name='tittle' className='w-full focus:outline-none h-[10%]' placeholder='Tittle' {...register("tittle",{
              required:true,
              minLength:0,
            })}></input>
        <textarea type='text' className='w-full focus:outline-none h-[70%] mt-[3%]' placeholder='Write a note...' {...register("content",{
              required:true,
              minLength:0,
            })}></textarea>
        <div className='flex px-4 relative h-[4vh] justify-between'>
            <div className='mt-1'>
                <button onClick={()=>setIsPinned(!isPinned)}>
       {isPinned? <TiPin/>: <TiPinOutline  />}
        </button>
        </div>
        <div className='mt-1'>
        <Controller
                name="file"
                control={control}
                render={({ field }) => (
                  <input {...field} type="file" id="image" className='absolute w-[10%] opacity-0' />
                )}
              />
            {/* <input type="file" className='absolute w-[10%] opacity-0' onChange={handleImageChange} /> */}
        <FaImage />
        </div>
        {/* <button className=''>Save</button> */}
        <button className='text-white  bg-black rounded-lg sm:px-2 max-sm:px-2 p-1 max-sm:py-0  text-[2vh] max-sm:text-[1vh]' type="submit">Save</button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default Home
