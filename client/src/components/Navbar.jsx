
import { useState ,useEffect} from 'react';
import React from "react";
import logo from "../assets/notebook2.png"

const Navbar = () => {
  const [isClient,setIsClient]=useState(false);
    const date = new Date();
    const [currentTime, setCurrentTime] = useState(new Date());
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    useEffect(() => {
      // Update the current time every second
      setIsClient(true);
      const intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
  
      // Clear the interval when the component is unmounted
      return () => clearInterval(intervalId);
    }, []);
  return (
    
      <nav className='relative flex h-[10.1vh] bg-[rgba(255,255,255,1)] bg-blue-200'>
        
       <img src={logo}  className='md:w-[5%] absolute max-sm:w-[15%] h-full sm:w-[8%] ml-[5%] md:mt-[0px] sm:mt-[1%] max-sm:mt-[0%] ' alt="logo"></img>
        <div className='flex  justify-between md:px-8 md:w-2/4 lg:mt-6 absolute right-[5%] mt-6 md:mt-[5%] xl:text-[2vh] lg:text-[1.3vh] md:text-[1vh] sm:text-[1vh] max-sm:pt-2  max-sm:text-[1vh] font-semibold '>
       {isClient && <div className='flex py-1 '>
        <div className=" mr-[5px]">
            {days[date.getDay()].substring(0,3)}
          </div>
          <div className=" ">
            {months[date.getMonth()].substring(0,3)}
          </div>
          <div className="ml-[0.4em]  ">
            {date.getDate()},
          </div>
          <div className="ml-[0.1em] mr-[2.3vw]">
          {currentTime.toLocaleTimeString().substring(0,5)}
          </div>
        </div>}
        <span className='mx-2 py-1'>About us</span>
        <span className='mx-2 py-1'>Contact us</span>
       <button className='text-white  bg-black bg-blue-700 rounded-lg sm:px-6 max-sm:px-2 p-1'>Sign in</button>
        </div> 
       
      </nav>
  )
}

export default Navbar




