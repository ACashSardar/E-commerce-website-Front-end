import React from 'react'
import Carousal from "./Carousal";
import MainBody from './MainBody';
import { Link, useNavigate} from 'react-router-dom';
import { addCartItem, addReview, deleteReview } from '../services/EcommerceServices';
import { useState } from 'react';
import { BASE_URL } from '../services/ServerBaseURL';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Homepage = ({products,setProducts,categories,selectedProductId,setSelectedProductId,
  quantity, setQuantity,loadCartitems,cartItems,handleSearch,loadProducts}) => {

  const userInfo=JSON.parse(localStorage.getItem("userInfo"));

  const [rating, setRating]=useState(0)
  const [comment, setComment]=useState("")
  
  const navigate=useNavigate();

  const handleAddCartItem= (productId,qty,userInfo)=>{
    const setOfProducts=cartItems.map((item)=>item.product.productId)
    if(setOfProducts.includes(productId)){
      toast("This item is already present in your cart.");
      return;
    }
    const data={quantity:qty,paymentStatus:"NP"}
     addCartItem(data,productId,userInfo).then(()=>{
      loadCartitems()
      toast("Item added to your cart.")
    })
    navigate("/cart")
  }

  const handleRatings=(value)=>{
    const stars=document.getElementsByClassName("star")
    const ratingSense=document.getElementById("rating-sense")
    setRating(value)
    for (let i = 0; i < value; i++) {
      const element = stars[i];
      element.style.color="yellow"
    }
    for (let i = value; i < 5; i++) {
      const element = stars[i];
      element.style.color="black"
    }

    switch (value) {
      case 0:
        ratingSense.innerHTML="Rate this product"
        break;
      case 1:
        ratingSense.innerHTML="Very Bad 🤮"
        break;
      case 2:
        ratingSense.innerHTML="Bad 😠"
        break;
      case 3:
        ratingSense.innerHTML="Good 😉"
        break;
      case 4:
        ratingSense.innerHTML="Very Good 😀"
        break;
      case 5:
        ratingSense.innerHTML="Excellent 🤩"
        break;

      default:
        break;
    }
  }

  const handleAddReview=(productId,userInfo)=>{
    if(rating===0 || comment==="") return;
    const data={
      comment:comment,
      rating:rating
    }
    addReview(productId,data,userInfo).then((res)=>{
      toast("Review submitted");
      handleRatings(0);
      setComment("");
      loadProducts();
    })
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

  const handleDeleteReview=(reviewId)=>{
    deleteReview(reviewId,userInfo).then((res)=>{
      toast("Review deleted.");
      loadProducts();
    })
  }

  return (
    <div className='pt-5'>
      {
        selectedProductId===0?
        <Carousal/>
        :
        <>
          { products.map((product,index)=>
          <div>
            { 
              product.productId===selectedProductId?
              <div className='container-fluid d-flex justify-content-center pt-5'>
                <div className="card rounded-2 border-0 pt-4" style={{width:"20rem"}} >
                  <img src={BASE_URL+`/api/v1/products/image/${product.imageURL}`} className="card-img-top rounded-2" alt="..." />
                </div>
                <div className="card rounded-2 border-0 p-3" style={{width:"20rem"}}>
                    <p className='fw-normal fs-3 mb-0'>{product.productName}</p>
                    <p className='fw-light fs-6 text-secondary mb-0'>Product-Id: ECPD{product.productId}</p>
                    <p className='fs-5'>
                      { 
                        "★★★★★".slice(0,calculateRatings(product.reviews))+"☆☆☆☆☆".slice(calculateRatings(product.reviews),5)
                      }
                    </p>
                    <p className='fw-normal fs-6 mb-0'>Ratings: {calculateRatings(product.reviews)}</p>
                    <p className='fw-bold fs-2 text-dark mb-0'>₹ {product.price}</p>

                    <input type="number" value={quantity} 
                    onChange={(e)=>{
                      if(e.target.value<1 || e.target.value>=product.stock){
                        toast("You can only select 1 to "+product.stock+" products")
                        return
                      }
                      setQuantity(e.target.value)
                    }} className='form-control rounded-2 border-0 shadow-none' style={{"width":"4rem"}}/>

                    <p className='fw-light fs-6 text-success mb-2'>In-stock: {product.stock} items</p>
                    <span className='mb-1'>
                      <button className='custom-outline-btn rounded-2 me-1' 
                      onClick={()=>setSelectedProductId(0)}>Cancel</button>
                      <button className='custom-btn rounded-2' 
                      onClick={()=>handleAddCartItem(product.productId,quantity,userInfo)}>+ Add to Cart</button>
                    </span>
                    <p className='fw-bold fs-6 mb-0'>Description:</p>
                    <label className='fw-normal fs-6 text-secondary mb-0'>{product.productDesc}</label>
                </div>

                <div className="card rounded-2 border-0 p-3" style={{width:"20rem"}}>
                  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5 fw-light" id="exampleModalLabel">Customer Review</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <ul className='stars'>
                            <li className='star' id="one" name="one" onMouseEnter={()=>{handleRatings(1)}}><i className='fa fa-star'></i></li>
                            <li className='star' id="two" name="two" onMouseEnter={()=>{handleRatings(2)}}><i className='fa fa-star'></i></li>
                            <li className='star' id="three" name="three" onMouseEnter={()=>{handleRatings(3)}}><i className='fa fa-star'></i></li>
                            <li className='star' id="four" name="four" onMouseEnter={()=>{handleRatings(4)}}><i className='fa fa-star'></i></li>
                            <li className='star' id="five" name="five" onMouseEnter={()=>{handleRatings(5)}}><i className='fa fa-star'></i></li>
                          </ul>
                          <p id="rating-sense" className='text-center fs-4 fw-light ms-3'>Rate this product</p>
                          <textarea name="comment" className='form-control' value={comment} placeholder='Say something about this product..' cols="20" rows="5"
                          onChange={(e)=>setComment(e.target.value)}></textarea>
                        </div>
                        <div class="modal-footer">
                          <button class="custom-outline-btn px-3 me-1" onClick={()=>{setComment(""); handleRatings(0)}}>Clear</button>
                          <button type="button" class="custom-btn" data-bs-dismiss="modal" onClick={()=>handleAddReview(product.productId,userInfo)}>Post review</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className='fw-normal fs-3'>Customer Reviews</p>
                  <div className='overflow-auto p-3' style={{height:"12rem"}}>
                    <div>
                      {
                        product.reviews.length>0?
                        product.reviews.map(review=>
                          <div>
                            <div className='d-flex'>
                              <span className='badge bg-dark me-2 fs-6 fw-light rounded-circle'>{review.user.name.substring(0,1)} </span>
                              <span className='fs-6 fw-bold'>{review.user.name}</span>
                            </div>
                            <div className='d-flex justify-content-between'>
                              <p className='fs-5 mb-0'>
                                { 
                                  "★★★★★".slice(0,review.rating)+"☆☆☆☆☆".slice(review.rating,5)
                                }
                              </p>
                              {
                                userInfo!==null && review.user.email===userInfo.username?
                                <Link className='link-danger fs-6 fw-bold text-decoration-none p-1' onClick={()=>handleDeleteReview(review.reviewId)}>Delete <i className='fa fa-times'></i></Link>
                                :<></>
                              }
                            </div>
                            <p>{review.comment}</p>

                          </div>
                        )
                        :<p className='text-center text-secondary fs-5 fw-light'>No reviews yet</p>
                      }
                    </div>

                  </div>
                  {
                    userInfo!==null?
                    <button className='custom-btn' data-bs-toggle="modal" data-bs-target="#exampleModal">+ Add product review</button>
                    :<></>
                  }
                  
                </div>
              </div>
            :<></>
          }
          </div>
      )}
        </>
      }

      <MainBody products={products} setProducts={setProducts} categories={categories} selectedProductId={selectedProductId} setSelectedProductId={setSelectedProductId} handleSearch={handleSearch}/>
    </div>
  )
}

export default Homepage
