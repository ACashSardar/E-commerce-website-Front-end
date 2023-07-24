import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../services/ServerBaseURL';

const MainBody = ({products,setProducts,categories,setSelectedProductId,keyword,handleSearch}) => {

    const chunkSize=8
    const [startIndx, setStartIndx]=useState(0)
    const userInfo=JSON.parse(localStorage.getItem("userInfo"));
    const priceRanges=[[100, 500], [500, 1000], [1000, 5000], [5000, 15000], [15000, 25000], [25000, 40000]];
    const [catId, setCatId]=useState(0);
    const [priceId, setPriceId]=useState(-1);
    const [low, setLow]=useState(0);
    const [high, setHigh]=useState(1000000);

    const searchByCategory=(catId)=>{
        axios.get(BASE_URL+"/api/v1/products", userInfo).then((res)=>{
            let temp=res.data
            .filter((item, index)=>catId===0 || item.category.categoryId===catId)
            .filter((item, index)=>item.price>=low && item.price<=high)
            setProducts(temp)
            setCatId(catId)
            categories.map(catg=>catg.categoryId).forEach(id => {
                if(id===catId) document.getElementById(id).style.backgroundColor="lavender"  
                else document.getElementById(id).style.backgroundColor="white"               
            });
            priceRanges.forEach((price, index) => {
                if(priceId==="price"+index) document.getElementById(priceId).style.backgroundColor="lavender"  
                else document.getElementById("price"+index).style.backgroundColor="white"               
            });
        })
    }

    const searchByPriceRange=(priceId, low, high)=>{
        axios.get(BASE_URL+"/api/v1/products", userInfo).then((res)=>{
            let temp=res.data
            .filter((item, index)=>catId===0 || item.category.categoryId===catId)
            .filter((item, index)=>item.price>=low && item.price<=high)
            setProducts(temp)
            setPriceId(priceId)
            setLow(low)
            setHigh(high)
            priceRanges.forEach((price, index) => {
                if(priceId==="price"+index) document.getElementById(priceId).style.backgroundColor="lavender"  
                else document.getElementById("price"+index).style.backgroundColor="white"               
            });
            categories.map(catg=>catg.categoryId).forEach(id => {
                if(id===catId) document.getElementById(id).style.backgroundColor="lavender"  
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
        <div className='d-flex justify-content-between mb-3 px-3' >   
            <span>
                <label className='fs-5 fw-bold'>Filter Products</label><hr className='text-dark mt-3 mb-0'/>
            </span>

            <span>
                <label className='fs-5 fw-bold'>Featured Products</label><hr className='text-dark mt-3 mb-0'/>
            </span>

            <input type="search" value={keyword} onChange={(e)=>handleSearch(e.target.value)} className='form-control text-dark fs-6 fw-bold rounded-3 p-2 px-3 mb-2 shadow-none'
            placeholder='🔍 Search for products..' style={{width:"18%"}} autoFocus/>
        </div>

        <div className='d-flex justify-content-between px-2'>
            <div className='filters'>
                <div className='overflow-auto mb-2' style={{height:"17rem"}}>
                    <div class="list-group me-1 rounded-0">
                        <Link className='list-group-item fs-6 fw-light border-0' id={0} onClick={()=>searchByCategory(0)}>🔹All Categories</Link>
                        {
                            categories.map((category,index)=>
                                <Link className='list-group-item fs-6 fw-light border-0' id={category.categoryId} onClick={()=>searchByCategory(category.categoryId)}>🔹{category.categoryName}</Link>
                            )
                        }
                    </div>
                </div>
                <div style={{height:"17rem"}}>
                    <div class="list-group me-1 rounded-0">
                        <Link className='list-group-item fs-6 fw-light border-0' onClick={()=>searchByPriceRange("price"+(-1), 0, 50000)}>🔸Any Price Range</Link>
                        {
                            priceRanges.map((price,index)=>
                                <Link className='list-group-item fs-6 fw-light border-0' id={"price"+index} onClick={()=>searchByPriceRange("price"+index, price[0], price[1])}>🔸₹{price[0]}-{price[1]}</Link>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className='row' style={{width:"80%"}}>
                {
                    products.length>0?
                    <>
                    {
                        products.slice(startIndx,startIndx+chunkSize).map((product,index)=>
                        <div className="card col-md-3 p-0 m-2 rounded-0 border-0" style={{width:"15rem"}} >
                            <Link className='selected-item link-dark' onClick={()=>{
                                setSelectedProductId(product.productId);                        
                            }}>
                            <div className='card-body rounded-0 p-0'>
                                <img src={BASE_URL+`/api/v1/products/image/${product.imageURL}`} className="card-img-top rounded-3" alt="..." style={{height:"15rem"}}/>
                            </div>
                            
                            <div className='card-body rounded-0' style={{height:"8rem"}}>
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
                    :<div><span className='fs-5 fw-light text-danger' style={{position:"relative",left:"16rem"}}>No items found</span></div>
                }
             </div>
        </div>
        <div className='d-flex justify-content-center my-4'>
            <nav aria-label="Page navigation example">
                <ul class="pagination mb-0">
                    <li class="page-item"><Link class="page-link fw-bold link-dark rounded-2 me-1" href="" onClick={()=>handlePagination(startIndx-chunkSize)}>&laquo; Previous</Link></li>
                    <li class="page-item"><Link class="page-link fw-bold link-dark rounded-2" href="" onClick={()=>handlePagination(startIndx+chunkSize)}>Next &raquo;</Link></li>
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default MainBody
