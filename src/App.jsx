import { createContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import LoginPage from "./pages/LoginPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage'
import UserPage from './pages/UserPage';
import RequireAuth from './auth/RequireAuth';
import axios from 'axios';
function App() {
  
  
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          {/* <Route path="userpage" element={<UserPage/>}/> */}
          {/* <Route path=":user" element={<UserPage />} /> */}
          {/* <Route path=":user/Profile" element={<UserPage />} /> */}
           { <Route  element={<RequireAuth />}>
            <Route path=":user" element={<UserPage/>} />
          </Route>}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
