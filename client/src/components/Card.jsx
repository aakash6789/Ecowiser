import React, { useState,useEffect,useRef } from 'react'
import { TiPinOutline,TiPin} from "react-icons/ti";
import { MdEdit } from "react-icons/md";
import axios from 'axios';
import toast from 'react-hot-toast';
const Card = (props) => {
    const titleRef = useRef(null);
    const obj1=props.obj;
    const [isEdit,setIsEdit]=useState(false);
    const [tittle,setTittle]=useState(obj1 ? obj1.Tittle : '');
    const [content,setContent]=useState(obj1 ? obj1.Content : '');
    const [isPinned,setIsPinned]=useState(obj1.isPinned);
    const formData=new FormData();
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (titleRef.current && !titleRef.current.contains(event.target) && titleRef.current.id!=obj1._id) {
            console.log(titleRef.current.id);
            // console.log(event.target);
            setIsEdit(false);
            console.log("triggered");
          }
        };
      
        document.body.addEventListener('click', handleClickOutside);
      
        return () => {
          document.body.removeEventListener('click', handleClickOutside);
        };
      }, []);
      const handleUpdate=async()=>{
        formData.append("tittle",tittle);
        formData.append("content",content);
        axios.put(`http://localhost:3000/api/v1/notes/updateContents`,{Tittle:tittle,Content:content,obj1,isPinned})
    .then(response => {
      // console.log("New respose is",response);
      // console.log(response)
      // setTittle(response.data.data.notes); 
     
      toast.success("Notes updated successfully")
    })
    .catch(error => {
      console.error('Error fetching books:', error);
      toast.error("Error fetching notes")
    });
      }
  return (
    <div ref={titleRef} id={obj1._id}  className='w-1/2 relative  border-gray-400 border-[2px] my-8  py-4 rounded-lg shadow-lg'>
        {!isEdit ?<div> <div className='absolute right-1 top-1'>  {isPinned ? <TiPin/>:<TiPinOutline/>} </div> 
      <div className='flex flex-col mt-[5%] ml-[10%]'>
      {obj1.image && <img src={obj1.image} className='w-[50%] rounded-lg'></img>}
        <h1 className='text-[1vh] md:text-[3vh] mt-[5%] font-bold'>{tittle}</h1>
        <h2 className='mt-[2%] text-[1vh] md:text-[2vh]'>{content}</h2>
      </div>
      <button className='absolute right-1 bottom-1' onClick={() => {
  setIsEdit(!isEdit);
  console.log("isEdit", isEdit);
}}><MdEdit /></button></div> :<div className='h-auto' >
      <button onClick={()=>setIsPinned(!isPinned)} className='absolute right-1 top-1'>  {isPinned? <TiPin/>: <TiPinOutline  />} </button> 
      <div className='flex flex-col mt-[5%] ml-[10%]'>
      {obj1.image && <img src={obj1.image} className='w-[50%] rounded-lg'></img>}
        <input className='text-[1vh] md:text-[3vh]' value={tittle} onChange={(e)=>setTittle(e.target.value)}></input>
        <textarea className='mt-[2%] mb-8 text-[1vh] md:text-[2vh] resize-none'  rows="4" cols="50" value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
      </div>
      <button className='absolute right-1 bottom-1 bg-black text-white px-2 rounded-md py-1 mx-2' onClick={() => {
  setIsEdit(!isEdit);
  console.log("isEdit toggled:", isEdit);
  handleUpdate();
}} >Save</button>
        </div>}
    
    </div>
  )
}

export default Card;


 {/* <div className='absolute right-1 top-1'>  {obj1.isPinned ? <TiPin/>:<TiPinOutline/>} </div> 
      <div className='flex flex-col mt-[5%] ml-[10%]'>
      {obj1.image && <img src={obj1.image} className='w-[70%]'></img>}
        <h1 className='text-[1vh] md:text-[3vh]'>{obj1.Tittle}</h1>
        <h2 className='mt-[2%] text-[1vh] md:text-[2vh]'>{obj1.Content}</h2>
      </div>
      <button className='absolute right-1 bottom-1'><MdEdit /></button> */}