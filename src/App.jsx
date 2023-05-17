import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from "./pages/LoginPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage'
function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<HomePage/>}/>
      <Route path="login" element={<LoginPage/>}/>
      <Route path="signup" element={<SignUpPage/>}/>


      

    </Routes>
    </BrowserRouter>
    
      
    </>
  )
}

export default App
