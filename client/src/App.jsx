import React from "react"
import { useState } from 'react'
import Home from "./components/Home.jsx"
import Navbar from "./components/Navbar.jsx"

function App() {

  return (
    <>
    <Navbar/>
    {/* <hr className=' border-black border-[1px]'></hr>  */}
      <Home/>
    </>
  )
}

export default App
