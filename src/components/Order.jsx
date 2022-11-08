import React from 'react'
import { Link } from 'react-router-dom'
import { updateOrder,deleteOrder } from '../services/EcommerceServices';

const Order = ({orders, loadOrders}) => {

    const userInfo=JSON.parse(localStorage.getItem("userInfo"));

    const handleSubmit=(e,orderId,userInfo)=>{
        e.preventDefault()
        const shipAddr=e.target.elements.shippingAddress.value
        e.target.elements.shippingAddress.value=""
        const data={
            shippingAddress:shipAddr,
        }
        updateOrder(data,orderId,userInfo).then((res)=>{
            loadOrders();
        })
    }

    const handleDeleteOrder=(orderId,userInfo)=>{
        deleteOrder(orderId,userInfo).then((res)=>{
            loadOrders();
        })
    }

  return (
    <div>
        <div className='container-fluid p-3'><h3 className='text-center'>Your Order <i class="fa fa-shopping-bag"></i></h3>
        {
            orders.map((order,index)=>
                order.transaction==='Pending'?
                    <div className='d-flex justify-content-center'>
                        <table className='table border shadow mt-5' style={{width:"80%"}}>
                            <thead>
                                <tr>
                                    <th className="fs-4 fw-normal">Product ID</th>
                                    <th className="fs-4 fw-normal">Name</th>
                                    <th className="fs-4 fw-normal">Price</th>
                                    <th className="fs-4 fw-normal">Image</th>
                                    <th className="fs-4 fw-normal">Quantity</th>
                                    <th className="fs-4 fw-normal">Sub Total</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                order.orderItems.map((orderItem,index)=>
                                    <tr>
                                        <td className="fs-6 fw-light">EC{orderItem.product.productId}</td>
                                        <td className="fs-6 fw-light">{orderItem.product.productName}</td>
                                        <td className="fs-6 fw-light">{orderItem.product.price} ₹ Only</td>
                                        <td className="fs-6 fw-light"><img src={`http://localhost:8080/api/v1/products/image/${orderItem.product.imageURL}`} alt="" style={{width:"3rem"}}/></td>
                                        <td className="fs-6 fw-light">{orderItem.quantity}</td>
                                        <td className="fs-6 fw-light">{orderItem.quantity*orderItem.product.price}</td>
                                    </tr>
                                )
                            }
                                <tr>
                                    <td colSpan="2" className="fs-5 fw-normal">Order date: {new Date(order.orderDate).toDateString()}</td>
                                    {(order.shippingAddress===""||order.shippingAddress===null)?
                                        <td colSpan="3" className="fs-5 fw-normal text-danger">Please add shipping address !</td>
                                        :<td colSpan="3" className="fs-5 fw-normal">{order.shippingAddress}</td>
                                    }
                                    <td colSpan="4" className='d-flex'>
                                        <form onSubmit={(e)=>handleSubmit(e,order.orderId,userInfo)} className="d-flex">
                                            <input type="text" className='form-control me-1' name="shippingAddress" placeholder='Enter Shipping Address'/>
                                            <button className='btn btn-success'>Save</button>
                                        </form>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="1" className="fs-4 fw-bold text-primary">Customer: {order.user.name}</td>
                                    <td colSpan="4" className='text-center fs-4 fw-bold text-success'> GrandTotal: {order.totalAmount} ₹</td>
                                    <td colSpan="2">
                                        <button className='btn btn-danger me-1' onClick={()=>handleDeleteOrder(order.orderId,userInfo)}>Delete Order</button>
                                        {
                                            (order.shippingAddress===""||order.shippingAddress===null)?
                                            <></>
                                            :<Link to="/payment"><button className='btn btn-primary text-light' >Proceed to Payment</button></Link>
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                :
                <></>
            )
        }
        </div>
    </div>
  )
}

export default Order
