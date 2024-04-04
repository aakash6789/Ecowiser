import React from 'react'
import { TiPinOutline,TiPin} from "react-icons/ti";
import { MdEdit } from "react-icons/md";
const Card = (props) => {
    const obj1=props.obj;
  return (
    <div className='w-1/4 relative border-gray-400 border-[2px] my-4 py-4'>
     <div className='absolute right-1 top-1'>  {obj1.isPinned ? <TiPin/>:<TiPinOutline/>} </div> 
      <div className='flex flex-col mt-[5%] ml-[10%]'>
      {obj1.image && <img src={obj1.image} className='w-[20%]'></img>}
        <h1 className='text-[1vh] md:text-[3vh]'>{obj1.Tittle}</h1>
        <h2 className='mt-[2%] text-[1vh] md:text-[2vh]'>{obj1.Content}</h2>
      </div>
      <div className='absolute right-1 bottom-1'><MdEdit /></div>
    </div>
  )
}

export default Card;
