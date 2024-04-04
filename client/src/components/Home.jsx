import React from 'react'
import { useState,useEffect,useMemo,useRef } from 'react';
import { FaImage } from "react-icons/fa";
import { TiPinOutline,TiPin} from "react-icons/ti";
import toast from "react-hot-toast";
import {useForm,Controller} from 'react-hook-form';
import axios from "axios";
import { SERVER_URL } from '../constants/constant';
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import Card from './Card.jsx';
const Home = () => {
    const formData=new FormData();
    const {
      register,
      handleSubmit,control,
      formState: { errors },reset
    } = useForm();
    const [isPinned,setIsPinned]=useState(false);
    const [notes,setNotes]=useState([]);
    const [loading,setLoading]=useState(true);
    const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showContent, setShowContent] = useState(false);

  const handleTitleFocus = () => {
    setShowContent(true);
  };

  const handleTitleBlur = () => {
    setShowContent(false);
  };
  
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
            getBooks();
            toast.success("New Note added sucessfully!!");
           setIsPinned(false);
           reset();
            
        } catch (error) {
            console.log("Error while adding a note",error);
            toast.error("Note didn't add, Try Again!!")
        }
    }
    const getBooks=async()=>{
      const pageSize = 6; // Number of notes per page
    const offset = (currentPage - 1) * pageSize;
      axios.get(`http://localhost:3000/api/v1/notes/get-notes?offset=${offset}&limit=${pageSize}`) 
    .then(response => {
      // console.log("New respose is",response);
      setNotes(response.data.data.notes); 
      setTotalPages(Math.ceil(response.data.data.totalCount/pageSize));
      setLoading(false);
      // console.log(notes);  
      // console.log(totalPages);  
      toast.success("Notes fetched successfully")
    })
    .catch(error => {
      console.error('Error fetching books:', error);
      toast.error("Error fetching notes")
    });
}

    useEffect(() => {
      
    getBooks();
  }, []);
  useEffect(() => {
    getBooks();
  }, [currentPage]);
  const titleRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (titleRef.current && !titleRef.current.contains(event.target)) {
        setShowContent(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

    
  return (
    <div className='mt-[5%]  '>
      <div className=' border-gray-400 border-[2px] mx-[30%] md:h-[auto] max-sm:h-auto pt-2 pb-2 px-2'>
      <form ref={titleRef} action="" className='h-[100%]' onSubmit={handleSubmit(onSubmit,onError)} encType='multipart/formData'>
        <input type='text' id='tittle' name='tittle' className='w-full focus:outline-none h-[15%]' placeholder='Tittle' onFocus={handleTitleFocus}
        onBlur={handleTitleBlur} {...register("tittle",{
              required:true,
              minLength:0,
            })}></input>
      { showContent && <div className='w-full focus:outline-none h-[70%] mt-[3%]'> <textarea type='text' className='w-full focus:outline-none h-[20vh]  mt-[1%]' placeholder='Write a note...' {...register("content",{
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
        <Controller className='cursor-pointer'
                name="file"
                control={control}
                render={({ field }) => (
                  <input {...field} type="file" id="image" className='absolute w-[10%] opacity-0 ' />
                )}
              />
            {/* <input type="file" className='absolute w-[10%] opacity-0' onChange={handleImageChange} /> */}
        <FaImage />
        </div>
        <button className='text-white  bg-black rounded-lg sm:px-2 max-sm:px-2 p-1 max-sm:py-0  text-[2vh] max-sm:text-[1vh]' type="submit">Save</button>
      
        </div>
        </div>}

        </form>
      </div>
                
      <div className='grid grid-cols-2 mt-[10%] justify-items-center items-center '>
      {Array.isArray(notes) ? (
    notes.map((note, ind) => <Card obj={note} key={ind + note._id} />)
) : (
    <h1>Loading ...</h1>
)}
</div>
<div className='flex justify-center'>
  <BsChevronCompactLeft className='mt-2 cursor-pointer' onClick={()=> currentPage===1?setCurrentPage(totalPages):setCurrentPage(currentPage-1)}/>
          <button  className=' bg-black text-white px-2 rounded-md py-1 mx-2' onClick={() => setCurrentPage(currentPage+1)}>{currentPage}</button>
        <BsChevronCompactRight className='mt-2 cursor-pointer' onClick={()=> currentPage===totalPages?setCurrentPage(1):setCurrentPage(currentPage+1)}/>
        </div>
    </div>
  )
}

export default Home
