import { useState } from 'react'
import { initializeApp } from "firebase/app";
import { useAuth } from "./Contexts/authContext";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Register from './Pages/Register'
import Journal from './Components/Journal';
import Statistics from './Pages/Statistics';
import './App.css'

function App() {
  
  const { currentUser, userLoggedIn } = useAuth()

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/dash" element={<Dashboard/>}/>
          {/* TODO: once dashboard is up send nonLogged in users to /login (first one) and logged in users to dashboard (2nd one) */}
          <Route path="/" element={userLoggedIn ? <Navigate to="/reg"/> : <Navigate to="/login"/>}/>
          <Route path = "/login" element={<Login/>}/>
          <Route path="/reg" element={<Register/>}/>
          <Route path='/jour' element={<Journal/>}/>
          <Route path='/stats' element={<Statistics/>}/>
        </Routes>
      </BrowserRouter>  
    </>
  )
}

export default App
