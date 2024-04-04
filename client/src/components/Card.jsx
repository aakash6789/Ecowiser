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
          if (titleRef.current && !titleRef.current.contains(event.target) && !event.target.matches("input") && !event.target.matches("button")) {
            setIsEdit(false);
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
        axios.put(`http://localhost:3000/api/v1/notes/updateContents`,{Tittle:tittle,Content:content,obj1})
    .then(response => {
      // console.log("New respose is",response);
      console.log(response)
      setTittle(response.data.data.notes); 
     
      toast.success("Notes updated successfully")
    })
    .catch(error => {
      console.error('Error fetching books:', error);
      toast.error("Error fetching notes")
    });
      }
  return (
    <div className='w-1/4 relative border-gray-400 border-[2px] my-4 py-4'>
        {!isEdit ?<div ref={titleRef}> <div className='absolute right-1 top-1'>  {obj1.isPinned ? <TiPin/>:<TiPinOutline/>} </div> 
      <div className='flex flex-col mt-[5%] ml-[10%]'>
      {obj1.image && <img src={obj1.image} className='w-[70%]'></img>}
        <h1 className='text-[1vh] md:text-[3vh]'>{tittle}</h1>
        <h2 className='mt-[2%] text-[1vh] md:text-[2vh]'>{content}</h2>
      </div>
      <button className='absolute right-1 bottom-1' onClick={() => {
  setIsEdit(!isEdit);
  console.log("isEdit toggled:", isEdit);
}}><MdEdit /></button></div> :<div className='h-auto' >
      <div className='absolute right-1 top-1'>  {obj1.isPinned ? <TiPin/>:<TiPinOutline/>} </div> 
      <div className='flex flex-col mt-[5%] ml-[10%]'>
      {obj1.image && <img src={obj1.image} className='w-[70%]'></img>}
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