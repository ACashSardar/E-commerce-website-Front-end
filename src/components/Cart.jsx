import React, { useState } from 'react'
import { deleteCartItem, updateCartItem,clearCart, addOrder} from '../services/EcommerceServices'
import { Link } from 'react-router-dom'

const Cart = ({cartItems,loadCartitems,loadOrders}) => {
    const [editing, setEditing]=useState(false)
    const [editIndx, setEditIndx]=useState(-1)
    const [currItemQuantity, setCurrItemQuantity]=useState(1)
    const grandTotal=cartItems.reduce((sum,cartItem)=>sum+cartItem.quantity*cartItem.product.price,0)

    const userInfo=JSON.parse(localStorage.getItem("userInfo"));

    const handleSelectedQuantity=(e,maxVal)=>{
        console.log(maxVal);
        if(0<parseInt(e.target.value) && parseInt(e.target.value)<=maxVal)
            setCurrItemQuantity(e.target.value);
        else alert(`You can only select (${1} to ${maxVal}) item(s)`)
    }

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

    const handleAddOrder=(userInfo)=>{

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
    <div className='bg-canvas p-5'>
        {
        cartItems.length>0?
        <div className='d-flex justify-content-center'>
            <table className='table table-hover border'>
                <thead className='bg-light'>
                    <tr>
                        <th className="fs-6 fw-bold">Product ID</th>
                        <th className="fs-6 fw-bold">Customer</th>
                        <th className="fs-6 fw-bold">Name</th>
                        <th className="fs-6 fw-bold">Price</th>
                        <th className="fs-6 fw-bold">Image</th>
                        <th className="fs-6 fw-bold">Quantity</th>
                        <th className="fs-6 fw-bold">Sub Total</th>
                        <th className="fs-6 fw-bold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    cartItems.map((cartItem,index)=>
                        <tr>
                            <th className="fs-6 fw-light">ECPD{cartItem.product.productId}</th>
                            <th className="fs-6 fw-light">{cartItem.user.name}</th>
                            <th className="fs-6 fw-light">{cartItem.product.productName}</th>
                            <th className="fs-6 fw-light">{cartItem.product.price} ₹</th>
                            <th className="fs-6 fw-light"><img src={`http://localhost:8080/api/v1/products/image/${cartItem.product.imageURL}`} alt="" style={{width:"3rem"}}/></th>
                            {
                                editing && editIndx===index?
                                <th className="fs-6 fw-light"><input className='form-control-sm border-light rounded-0' type="number" value={currItemQuantity} step={1} 
                                    onChange={(e)=>{handleSelectedQuantity(e,cartItem.product.stock)}} style={{width:"4rem"}}/>
                                </th>
                                :<th className="fs-6 fw-light">{cartItem.quantity}</th>
                            }
                            
                            <th className="fs-6 fw-light">{cartItem.quantity*cartItem.product.price} ₹ </th>
                            <th className="fs-6 fw-light">
                                {
                                    editing && editIndx===index?
                                    <button className='btn btn-success btn-sm fw-bold rounded-0 me-2' 
                                        onClick={()=>{handleUpdatingCartItem(cartItem.cartItemId,currItemQuantity,userInfo); setEditing(false);}}>Update</button>
                                    :<button className='btn btn-primary btn-sm fw-bold rounded-0 me-2' 
                                        onClick={()=>{setCurrItemQuantity(cartItem.quantity); setEditing(true); setEditIndx(index)}}>Edit</button>
                                }
                                
                                <button className='btn btn-danger btn-sm fw-bold rounded-0' onClick={()=>{handleDeletingCartItem(cartItem.cartItemId,userInfo)}}>Delete</button>
                            </th>
                        </tr>
                    )
                }
                    <tr>
                        <td colSpan="1"><button className='btn btn-secondary btn-sm fw-bold rounded-0' onClick={()=>{clearCart(cartItems);loadCartitems()}}>Clear cart</button></td>
                        <td colSpan="6" className='text-center fs-5 fw-bold text-primary'> GrandTotal: {grandTotal} ₹</td>
                        <td colSpan="1"><Link to="/order"><button className='btn btn-success btn-sm fw-bold rounded-0 px-3' onClick={()=>handleAddOrder(userInfo)}>Check Out</button></Link></td>
                    </tr>
                </tbody>
            </table>
        </div>
        :
        <div className='text-center text-primary'>My Cart is currently empty.</div>
        }

    </div>
  )
}

export default Cart
