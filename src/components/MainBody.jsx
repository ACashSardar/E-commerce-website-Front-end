import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const MainBody = ({products,setProducts,categories,setSelectedProductId,keyword,handleSearch}) => {

    const chunkSize=4
    const [startIndx, setStartIndx]=useState(0)
    const userInfo=JSON.parse(localStorage.getItem("userInfo"));

    const searchByCategory=(catId)=>{
        axios.get("http://localhost:8080/api/v1/products/search/"+catId,userInfo).then((res)=>{
            setProducts(res.data)
            categories.map(catg=>catg.categoryId).forEach(id => {
                if(id===catId) document.getElementById(id).style.backgroundColor="lightblue"  
                else document.getElementById(id).style.backgroundColor="white"               
            });

        })
    }

    const handlePagination=(indx)=>{
        if(indx<0 || indx>=products.length) return;
        setStartIndx(indx);
    }

    const calculateRatings=(reviews)=>{
        const numOfRatings=reviews.length;
    
        if(numOfRatings===0) return 0;
    
        let totalRatings=0;
    
        reviews.forEach(review => {
          totalRatings+=review.rating;
        });
    
        return parseInt(totalRatings/numOfRatings);
      }

  return (
    <div className='p-3 mt-5'>
        <div className='d-flex justify-content-between mb-5 px-3' >   
            <span>
                <label className='fs-5 fw-bold'>Product Categories</label><hr className='text-dark mt-3 mb-0'/>
            </span>

            <span>
                <label className='fs-5 fw-bold'>Featured Products</label><hr className='text-dark mt-3 mb-0'/>
            </span>

            <input type="search" value={keyword} onChange={(e)=>handleSearch(e.target.value)} className='form-control text-dark fs-5 fw-bold rounded-0 border-0 border-bottom p-2 mb-2 shadow-none'
            placeholder='Search products🔍' style={{width:"18%"}} autoFocus/>
        </div>

        <div className='d-flex justify-content-between px-3'>

            <div className='overflow-auto' style={{height:"17rem"}}>
                <div class="list-group me-3 rounded-0">

                    <Link className='list-group-item fs-5 fw-light border-0' id={0} onClick={()=>searchByCategory(0)}>All Categories</Link>
                    {
                        categories.map((category,index)=>
                            <Link className='list-group-item fs-5 fw-light border-0' id={category.categoryId} onClick={()=>searchByCategory(category.categoryId)}>🔹{category.categoryName}</Link>
                        )
                    }
                    
                </div>
            </div>

            <div className='row' style={{width:"80%"}}>
                {
                    products.length>0?
                    <>
                    {
                        products.slice(startIndx,startIndx+chunkSize).map((product,index)=>
                        <div className="card col-md-3 p-0 m-2 rounded-0 border-0" style={{height:"20.5rem",width:"15rem"}} >
                            <Link className='selected-item link-dark' onClick={()=>{
                                setSelectedProductId(product.productId);                        
                            }}>
                                <img src={`http://localhost:8080/api/v1/products/image/${product.imageURL}`} className="card-img-top" alt="..." style={{height:"14rem"}}/>
                            
                            <div className='card-body'>
                                <label className='card-text fw-light fs-6 text-dark'>{product.productName}</label><br />
                                <div className='d-flex justify-content-between'>
                                    <p className='card-text fw-normal fs-5 text-danger'>₹{product.price}</p>
                                    <p className='fs-5'>
                                        {
                                            "★★★★★".slice(0,calculateRatings(product.reviews))+"☆☆☆☆☆".slice(calculateRatings(product.reviews),5)
                                        }
                                    </p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        )
                    }
                    </>
                    :<div><span className='fs-4 fw-light text-danger' style={{position:"relative",left:"16rem"}}>No results match your search</span></div>
                }
             </div>
        </div>
        <div className='d-flex justify-content-center my-4'>
            <nav aria-label="Page navigation example">
                <ul class="pagination mb-0">
                    <li class="page-item"><Link class="page-link fw-bold link-dark rounded-0 me-1" href="" onClick={()=>handlePagination(startIndx-chunkSize)}>&laquo; Previous</Link></li>
                    <li class="page-item"><Link class="page-link fw-bold link-dark rounded-0" href="" onClick={()=>handlePagination(startIndx+chunkSize)}>Next &raquo;</Link></li>
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default MainBody
