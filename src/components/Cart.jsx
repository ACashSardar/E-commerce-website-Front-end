import React, { useEffect, useState } from 'react'
import { deleteCartItem, updateCartItem,clearCart, addOrder} from '../services/EcommerceServices'
import { Link } from 'react-router-dom'
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = ({cartItems, setCartItems, loadCartitems, loadOrders}) => {
    
    const [grandTotal, setGrandTotal]=useState(0);

    const handleGrandTotal=()=>{
        let ans=0
        cartItems.forEach((item)=>{
            ans+=item.quantity*item.product.price;
        })
        setGrandTotal(ans)
    }

    useEffect(()=>{
        handleGrandTotal()
    })

    const userInfo=JSON.parse(localStorage.getItem("userInfo"));
    const handleUpdateCartItem=(cartItemId, change, userInfo)=>{
        let ind=-1;
        cartItems.forEach((item, index)=>{
            if(item.cartItemId===cartItemId){
                ind=index;
            }
        })
        let currItem=cartItems[ind]
        let currItemQuantity=currItem.quantity;
        if(currItem.quantity+change>=1 && currItem.quantity+change<=currItem.product.stock){
            currItemQuantity+=change;
        }
        else if(currItem.quantity+change>currItem.product.stock){
            toast(`We have only ${currItem.product.stock} of this item in stock.`)
        }
        const data={
            quantity:currItemQuantity,
            paymentStatus:"NP"
        }
        updateCartItem(data, cartItemId, userInfo).then(()=>{
            loadCartitems();
        })
    }

    const handleDeletingCartItem=(cartItemId, userInfo)=>{
        const arr=cartItems.filter((item)=>item.cartItemId!==cartItemId)
        deleteCartItem(cartItemId, userInfo).then(()=>{
            setCartItems(arr)
            toast("One cart item has been deleted.")
        })
        
    }

    const handleAddOrder=(userInfo)=>{
        const cartData={
            username:userInfo.username,
            totalAmount:grandTotal,
            cartItems:cartItems
        }
        addOrder(cartData,userInfo).then(()=>{
            loadOrders();
        })
    }

  return (
    <div className='bg-canvas p-5'>
        { cartItems.length>0 ?
            <div className='row'>
                <div className="col-md-8 col-sm-12 p-2">
                {
                    cartItems.map((cartItem,index)=>
                        <div className="shadow bg-light rounded-1 d-flex p-2 mb-2">
                            <img className='rounded-1' src={`http://localhost:8080/api/v1/products/image/${cartItem.product.imageURL}`} alt="" style={{height:"10rem", width:"10rem"}}/>
                            <div className='p-2 px-4' style={{width:"100%"}}>
                                <h3 className='text-danger fw-bold'>{cartItem.quantity*cartItem.product.price} ₹</h3>
                                <h4>{cartItem.product.productName}</h4>
                                <p>{cartItem.product.productDesc}</p>
                                <div className="d-flex justify-content-between">
                                    <span className='me-2'>
                                        <button className='btn btn-sm btn-light border fw-bold rounded-1' onClick={()=>handleUpdateCartItem(cartItem.cartItemId, -1, userInfo)}>-</button>
                                        <span className='fw-bold rounded-1 p-2 px-2'>x {cartItem.quantity}</span>
                                        <button className='btn btn-sm btn-light border fw-bold rounded-1' onClick={()=>handleUpdateCartItem(cartItem.cartItemId, +1, userInfo)}>+</button>
                                    </span>
                                    <button className='btn btn-danger text-light rounded-1' onClick={()=>{handleDeletingCartItem(cartItem.cartItemId, userInfo)}}>Remove</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                </div>
                <div className="col-md-4 col-sm-12 shadow bg-light rounded-1 p-4 mt-2 mb-3">
                    <div className='fs-5 d-flex justify-content-between mb-1'>
                        <label>Sub-total</label>
                        <label>{grandTotal} ₹</label>
                    </div>
                    <div className='fs-5 d-flex justify-content-between mb-1'>
                        <label>Delivery</label>
                        <label>0 ₹</label>
                    </div>
                    <hr />
                    <div className='fs-5 d-flex justify-content-between mb-4'>
                        <b>Grand total:</b>
                        <b>{grandTotal} ₹</b>
                    </div>
                    <div className='mb-4'>
                        <p className='fs-5'>We accept:</p>
                        <div className='d-flex'>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/640px-Visa.svg.png" alt="" style={{height:"2rem", width:"3rem"}} className='border me-2'/>
                            <img src="https://1000logos.net/wp-content/uploads/2017/03/Color-MasterCard-Logo.jpg" alt="" style={{height:"2rem", width:"3rem"}} className='border me-2'/>
                            <img src="https://bsmedia.business-standard.com/_media/bs/img/article/2015-01/19/full/1421664764-4083.jpg?im=FeatureCrop,size=(826,465)" alt="" style={{height:"2rem", width:"3rem"}} className='border me-2'/>
                            <img src="https://st4.depositphotos.com/5225467/22068/v/450/depositphotos_220680152-stock-illustration-paypal-logo-printed-white-paper.jpg" alt="" style={{height:"2rem", width:"3rem"}} className='border me-2'/>
                        </div>
                    </div>
                    <div className='fs-4 d-flex justify-content-between'>
                        <button className='btn btn-danger rounded-1' onClick={()=>{
                            clearCart(cartItems);
                            toast("Your cart has been cleared.")
                            loadCartitems();
                        }} style={{width:"50%"}}>Clear cart</button>
                        <Link to="/order" className='text-decoration-none' ><button className='btn btn-success rounded-1 px-5 py-2' onClick={()=>handleAddOrder(userInfo)}>Check out</button></Link>
                    </div>
                </div>
            </div>
            :
            <div className='text-center text-secondary'>
                <h5>Cart is currently empty.</h5>
            </div>
        }

    </div>
  )
}

export default Cart
