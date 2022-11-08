import React, { useState } from 'react'
import { deleteCartItem, updateCartItem,clearCart, addOrder} from '../services/EcommerceServices'
import { Link } from 'react-router-dom'

const Cart = ({cartItems,loadCartitems,loadOrders,username}) => {
    const [editing, setEditing]=useState(false)
    const [editIndx, setEditIndx]=useState(-1)
    const [currItemQuantity, setCurrItemQuantity]=useState(1)
    const grandTotal=cartItems.reduce((sum,cartItem)=>sum+cartItem.quantity*cartItem.product.price,0)

    const userInfo=JSON.parse(localStorage.getItem("userInfo"));

    const handleUpdatingCartItem=(cartItemId,currItemQuantity,userInfo)=>{
        if(currItemQuantity===0){
            setCurrItemQuantity(1)
        }
        const data={
            quantity:currItemQuantity,
            paymentStatus:"NP"
        }
        updateCartItem(data,cartItemId,userInfo).then(()=>{
            loadCartitems();
        })
    }

    const handleDeletingCartItem=(cartItemId,userInfo)=>{
        deleteCartItem(cartItemId,userInfo).then(()=>{
            loadCartitems();
        })
        
    }

    const handleOrder=(userInfo)=>{

        const cartData={
            username:userInfo.username,
            totalAmount:grandTotal,
            cartItems:cartItems
        }
        console.log(cartData);
        addOrder(cartData,userInfo).then(()=>{
            loadOrders();
        })
    }

  return (
    <div>
        <div className='container-fluid p-2 bg-success text-light text-center'><p className='fs-2 fw-light'>Your Cart <i class="fa fa-shopping-cart"></i></p></div>
        <div className='d-flex justify-content-center'>
            <table className='table border shadow mt-5' style={{width:"80%"}}>
                <thead>
                    <tr>
                        <th className="fs-4 fw-normal">Product ID</th>
                        <th className="fs-4 fw-normal">Customer</th>
                        <th className="fs-4 fw-normal">Name</th>
                        <th className="fs-4 fw-normal">Price</th>
                        <th className="fs-4 fw-normal">Image</th>
                        <th className="fs-4 fw-normal">Quantity</th>
                        <th className="fs-4 fw-normal">Sub Total</th>
                        <th className="fs-4 fw-normal">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    cartItems.map((cartItem,index)=>
                        <tr>
                            <th className="fs-6 fw-light">EC{cartItem.product.productId}</th>
                            <th className="fs-6 fw-light">{cartItem.user.name}</th>
                            <th className="fs-6 fw-light">{cartItem.product.productName}</th>
                            <th className="fs-6 fw-light">{cartItem.product.price} ₹ Only</th>
                            <th className="fs-6 fw-light"><img src={`http://localhost:8080/api/v1/products/image/${cartItem.product.imageURL}`} alt="" style={{width:"3rem"}}/></th>
                            {
                                editing && editIndx===index?
                                <th className="fs-6 fw-light"><input type="number" placeholder={cartItem.quantity} step={1} onChange={(e)=>setCurrItemQuantity(e.target.value)} /></th>
                                :<th className="fs-6 fw-light">{cartItem.quantity}</th>
                            }
                            
                            <th className="fs-6 fw-light">{cartItem.quantity*cartItem.product.price}</th>
                            <th className="fs-6 fw-light">
                                {
                                    editing && editIndx===index?
                                    <button className='btn btn-success me-2' onClick={()=>{handleUpdatingCartItem(cartItem.cartItemId,currItemQuantity,userInfo);setEditing(false);}}>Update</button>
                                    :<button className='btn btn-primary me-2' onClick={()=>{setEditing(true); setEditIndx(index)}}>Edit</button>
                                }
                                
                                <button className='btn btn-danger' onClick={()=>{handleDeletingCartItem(cartItem.cartItemId,userInfo)}}>Delete</button>
                            </th>
                        </tr>
                    )
                }
                    <tr>
                        <td colSpan="1"><button className='btn btn-secondary' onClick={()=>{clearCart(cartItems);loadCartitems()}}>Clear cart</button></td>
                        <td colSpan="6" className='text-center fs-4 fw-bold text-danger'> GrandTotal: {grandTotal}₹</td>
                        <td colSpan="1"><Link to="/order"><button className='btn btn-info text-light' onClick={()=>handleOrder(userInfo)}>Confirm Order</button></Link></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Cart
