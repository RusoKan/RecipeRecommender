import { createContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import LoginPage from "./pages/LoginPage"
import { BrowserRouter, Routes, Route ,useParams } from "react-router-dom";
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage'
import UserPage from './Users/UserPage';
import RequireAuth from './auth/RequireAuth';
import axios from 'axios';
import PageNotFound from './pages/PageNotFound';
import Profile from './Users/Profile';
import Recipes from './Users/Recipes';
import MyRecipes from './Users/MyRecipes';
import ShoppingList from './Users/ShoppingList';
import "./index.css"
function App() {
  
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="login" element={<LoginPage />} />
          <Route exact path="signup" element={<SignUpPage />} />
          {/* <Route path="userpage" element={<UserPage/>}/> */}
          {/* <Route path=":user" element={<UserPage />} /> */}
          {/* <Route path=":user/Profile" element={<UserPage />} /> */}
          <Route  element={<RequireAuth />}>
            {/* <Route path=":user" element={<UserPage />} /> */}
            <Route path="dashboard" element={<UserPage />} />
            <Route path="profile" element={<Profile/>} />
            <Route path="recipes" element={<Recipes/>}/>
            <Route path="my-recipes" element={<MyRecipes/>}/>
            <Route path="shoppingList" element={<ShoppingList/>}></Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
