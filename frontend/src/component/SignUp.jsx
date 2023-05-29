import React, { useEffect } from "react";
import { useForm } from 'react-hook-form';
import {useNavigate} from 'react-router-dom'

export default function SignUp() {
  const { register, handleSubmit , reset} = useForm();
  const navigate = useNavigate();
  
  
  useEffect(()=>{
      const auth = localStorage.getItem('user');
      if(auth){
          navigate('/')
      }
  })

  const onSubmit = async(data) => {console.log(data); // You can do something with the form data here
  reset();


  let result = await fetch('http://localhost:5000/register',{
  method:"POST",
  body:JSON.stringify(data),
  headers:{
    "Content-Type":"application/json"
  }
 })


 result = await result.json()
 console.log(result)

 if(result){
  localStorage.setItem('user',JSON.stringify(result.result))
  localStorage.setItem('token',JSON.stringify(result.auth))
  navigate('/')
 }
};

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-title">
                <h1>Register</h1>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <p>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter Name"
                      {...register('name')}
                    />
                  </p>
                  <p>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter Email"
                      {...register('email')}
                    />
                  </p>
                  <p>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter Password"
                      {...register('password')}
                    />
                  </p>
                  <input
                    type="submit"
                    value="Sign Up"
                    className="btn btn-outline-success"
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
    </>
  );
}
