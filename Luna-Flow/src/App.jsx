import { useState } from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>  
    </>
  )
}

export default App
