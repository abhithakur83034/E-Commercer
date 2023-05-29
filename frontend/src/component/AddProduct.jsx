import React from "react";
import {useForm} from 'react-hook-form';
import classNames from "classnames";


export default function AddProduct(){
    const {register , handleSubmit , reset,formState: {errors}} = useForm();


    const onSubmit = async (data) => {
        console.log(data)
    
         const userId = JSON.parse(window.localStorage.getItem('user'))._id

       let  name=data.name;
       let  price=data.price;
       let  product=data.product;
       let  brand=data.brand;

       let dt = {name,price,product,brand,userId}

    


    const result = await fetch("http://localhost:5000/add-product",{
      headers:{
        "Content-Type":"application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    },
        method:"POST",
        body:JSON.stringify(dt)
       
    })
   const allData = await result.json()
    console.log(allData)
    reset()
    }



    return(
        <>
      <div className="container">
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-title">
                <h1>Add Product</h1>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <p>
                    <input
                      type="text"
                      name="name"
                      className={classNames("form-control", {"is-invalid": errors.name})}
                      placeholder="Enter product name"
                      {...register("name",{
                        required:true})}
                    />
                    {errors?.name && <span className="invalid-feedback">please fill the name</span>}
                  </p>
                  <p>
                    <input
                      type="number"
                      name="price"
                      className={classNames("form-control", {"is-invalid": errors.name})}
                      placeholder="Enter Price"
                      {...register("price",{
                        required:true})}
                    />
                     {errors?.name && <span className="invalid-feedback">please fill the price</span>}
                  </p>
                  <p>
                    <input
                      type="text"
                      name="product"
                      className={classNames("form-control", {"is-invalid": errors.name})}
                      placeholder="Enter Product"
                      {...register("product",{
                        required:true})}
                    />
                     {errors?.name && <span className="invalid-feedback">please fill the product</span>}
                  </p>
                  <p>
                    <input
                      type="text"
                      name="brand"
                      className={classNames("form-control", {"is-invalid": errors.name})}
                      placeholder="Enter Brand"
                      {...register("brand",{
                        required:true})}
                    />
                     {errors?.name && <span className="invalid-feedback">please fill the Brand</span>}
                  </p>
                  <input
                    type="submit"
                    value="Add Product"
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
    )
}