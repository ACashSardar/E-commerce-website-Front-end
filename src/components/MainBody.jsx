import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';

const MainBody = ({products,setProducts,categories,setSelectedProductId}) => {

    const userInfo=JSON.parse(localStorage.getItem("userInfo"));

    const searchByCategory=(catId)=>{
        axios.get("http://localhost:8080/api/v1/products/search/"+catId,userInfo).then((res)=>{
            setProducts(res.data)
        })
    }

  return (
    <div className='container-fluid p-0'>
        <div className='d-flex justify-content-center px-3'>
            <div>
                <div class="list-group">
                    <Link className='list-group-item list-group-item-action active fs-5 fw-light text-light'>Categories</Link>
                    <Link className='list-group-item fs-5 fw-light' onClick={()=>searchByCategory(0)}>All Categories</Link>
                    {
                        categories.map((category,index)=>
                            <Link className='list-group-item fs-5 fw-light' onClick={()=>searchByCategory(category.categoryId)}>{category.categoryName}</Link>
                        )
                    }
                </div>
            </div>
            <div className='row mx-auto mb-5' style={{width:"80%"}}>
                {
                    products.map((product,index)=>
                    <div className="card col-md-3 shadow p-0" >
                        <Link className='hover-slide' onClick={()=>{
                            setSelectedProductId(product.productId);                        
                        }}>
                            <img src={`http://localhost:8080/api/v1/products/image/${product.imageURL}`} className="card-img-top" alt="..." style={{height:"20rem"}}/>
                            <div class="overlay" >
                            <div class="d-flex flex-column">
                                <span class="bg-light text-dark rounded-1 fs-5 fw-light p-3">{product.productDesc}</span><br/>
                                <span class="bg-success text-light rounded-1 fs-4 fw-light p-3">{product.price} ₹ Only</span>
                            </div>
                            </div>
                        </Link>
                    </div>
                    )
                }
            </div>
        </div>

    </div>
  )
}

export default MainBody
