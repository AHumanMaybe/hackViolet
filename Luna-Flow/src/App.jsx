import { useState } from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Login/>}/>
        </Routes>
      </BrowserRouter>  
    </>
  )
}

export default App
