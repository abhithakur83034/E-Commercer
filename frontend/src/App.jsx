import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css'
import Product from './component/Product'
import AddProduct from './component/AddProduct'
import Logout from './component/Logout'
import Profile from './component/Profile'
import UpdateProduct from './component/UpdateProduct'
import Header from "./component/Header";
import Footer from "./component/Footer";
import SignUp from "./component/SignUp";
import Private from "./component/Private";
import Login from "./component/Login";

export default function App(){
    return(
        <>
        <BrowserRouter>
        <Header/>
       
           <Routes>
              <Route  element={<Private/>} >
              <Route path="/" element={<Product/>} />
              <Route path="/addproduct" element={<AddProduct/>} />
              <Route path="/logout" element={<Logout/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/updateproduct/:id" element={<UpdateProduct/>} />
              </Route>
              <Route path="/signup" element={<SignUp/>} />
              <Route path="/login" element={<Login/>} />
           </Routes>
           {/* <Footer/> */}
        </BrowserRouter>

           
        </>
    )
}