import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'

export default function Product(){
    const [product , setProduct] = useState([]);

    useEffect(()=>{
        getProducts()
    },[])

    const getProducts=async()=>{
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();

        setProduct(result)
    }
    console.log(product)

    const deleteProduct=async(id) =>{
        console.log(id)
        let result = await fetch('http://localhost:5000/product/'+id,{
            method:"DELETE",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json()
        if(result){
            getProducts()
        }
    }

      const searchHandle =async(e)=>{
        let key = e.target.value;
        if(key){

            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = await result.json()
            if(result){
                setProduct(result)
            }
        }else{
            getProducts()
        }
      }


    return(
        <>
         <h1>Product List</h1>
         <p>
        <input type="search"
         className="form-control"
         style={{width:"500px"}}
         placeholder="Search Your Product"
         onChange={searchHandle}
        />
        </p>
         <table className="table table-hover">
           <thead>
           <tr>
            <th>S. No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Product</th>
            <th>Brand</th>
            <th>Action</th>
            </tr>
           </thead>
           <tbody>
           {
        product.length > 0 ?  product.map((item,index)=>{
                return(
                    <tr key={item._id}>
                    <th>{index}</th>
                    <th>{item.name}</th>
                    <th>{item.price}</th>
                    <th>{item.product}</th>
                    <th>{item.brand}</th>
                    <th> <button onClick={()=>{deleteProduct(item._id)}}
                     className="btn btn-outline-danger">Delete</button>
                      </th>                  
                  <th>
                    <Link to={"/updateproduct/"+item._id}  className="btn btn-outline-success">Update</Link>
                  </th>


                   </tr>
                )
               
            })
            : <h1>No Result Found</h1>
           }
           </tbody>
          
         </table>
        </>
    )
}