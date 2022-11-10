import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const MainBody = ({products,setProducts,categories,setSelectedProductId}) => {

    const chunkSize=3
    const [startIndx, setStartIndx]=useState(0)
    

    const userInfo=JSON.parse(localStorage.getItem("userInfo"));

    const searchByCategory=(catId)=>{
        axios.get("http://localhost:8080/api/v1/products/search/"+catId,userInfo).then((res)=>{
            setProducts(res.data)
        })
    }

    const handlePagination=(indx)=>{
        if(indx<0 || indx>=products.length) return;
        setStartIndx(indx);
    }

  return (
    <div className='container-fluid p-0'>
        <div className='d-flex justify-content-center px-3'>

            <div class="list-group me-5 rounded-0">
                <Link className='list-group-item fs-5 fw-light text-light accent1-bg'>Categories</Link>
                <Link className='list-group-item fs-5 fw-light' onClick={()=>searchByCategory(0)}>All Categories</Link>
                {
                    categories.map((category,index)=>
                        <Link className='list-group-item fs-5 fw-light' onClick={()=>searchByCategory(category.categoryId)}>{category.categoryName}</Link>
                    )
                }
            </div>

            <div className='row ' style={{width:"60%"}}>
                {
                    products.slice(startIndx,startIndx+chunkSize).map((product,index)=>
                    <div className="card col-md-3 p-0 m-2 border-0 shadow" style={{height:"20rem",width:"17rem"}} >
                        <Link className='selected-item' onClick={()=>{
                            setSelectedProductId(product.productId);                        
                        }}>
                            <img src={`http://localhost:8080/api/v1/products/image/${product.imageURL}`} className="card-img-top" alt="..." style={{height:"14rem"}}/>
                        
                        <div className='card-body'>
                            <label className='card-text fw-light fs-6'>{product.productDesc}</label>
                            <p className='card-text fw-light fs-5'>{product.price} ₹ Only</p>
                        </div>
                        </Link>
                    </div>
                    )
                }
            </div>
        </div>
        
        <div className='d-flex justify-content-center my-4'>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item"><Link class="page-link link-success" href="" onClick={()=>handlePagination(startIndx-chunkSize)}>&laquo; Previous</Link></li>
                    <li class="page-item"><Link class="page-link link-success" href="" onClick={()=>handlePagination(startIndx+chunkSize)}>Next &raquo;</Link></li>
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default MainBody
