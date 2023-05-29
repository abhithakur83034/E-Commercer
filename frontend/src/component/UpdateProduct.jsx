import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams,useNavigate } from 'react-router-dom';

export default function UpdateProduct() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const params = useParams();
  const [result, setResult] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    productDetails();
  }, []);

  const productDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/product/${params.id}`,{
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
      });
      const result = await response.json();
      setResult(result);
      // Set form values using setValue
      setValue("name", result.name);
      setValue("price", result.price);
      setValue("product", result.product);
      setValue("brand", result.brand);
    } catch (error) {
      console.error("Error fetching product detail:", error);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
   
    let response = await fetch(`http://localhost:5000/product/${params.id}`,{
        headers:{
            "Content-Type":"application/json",
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
        method:"PUT",
        body:JSON.stringify(data)
    })
    const result = await response.json();
    console.log(result)
    navigate('/')
    reset();
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-title">
                <h1>Update Products</h1>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <p>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter product name"
                      defaultValue={result.name }
                      {...register("name")}
                    />
                  </p>
                  <p>
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      placeholder="Enter Price"
                      defaultValue={result.price }
                      {...register("price")}
                    />
                  </p>
                  <p>
                    <input
                      type="text"
                      name="product"
                      className="form-control"
                      placeholder="Enter Product"
                      defaultValue={result.product }
                      {...register("product")}
                    />
                  </p>
                  <p>
                    <input
                      type="text"
                      name="brand"
                      className="form-control"
                      placeholder="Enter Brand"
                      defaultValue={result.brand }
                      {...register("brand")}
                    />
                  </p>
                  <input
                    type="submit"
                    value="Update Product"
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
