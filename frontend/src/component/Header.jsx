import React from "react";
import { Link,useNavigate } from "react-router-dom";


export default function Header(){
    const navigate = useNavigate();
    const auth = localStorage.getItem('user');

    const logout=()=>{
        localStorage.clear();
        navigate('/signup')
    }
    return(
        <>
       
      <div className="header">
      {/* <img height="50px"
         alt="" />
          */}
      { auth ? <ul className="nav justify-content-right">
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Products</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/addproduct">Add Product</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/updateproduct/:id">Update Product</Link>
            </li>
           
            <li className="nav-item">
                <Link className="nav-link"  to="/profile">Profile</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" onClick={logout}  to="/signup">Logout ({JSON.parse(auth).name} ) </Link>            </li>


            </ul>
            :
            <ul   className="nav justify-content-right">
                  <li className="nav-item">
                        <Link className="nav-link"  to="/signup">SignUp</Link>
                  </li>
            <li className="nav-item">
                 <Link className="nav-link" to="/login">Login</Link>
           </li>
            
            </ul>
        }
       </div>
        </>
    )
}