import React from 'react'
import { deleteOrder } from '../services/EcommerceServices';

const ListOrders = ({orders, loadOrders}) => {

    const userInfo=JSON.parse(localStorage.getItem("userInfo"));

    const handleDeleteOrder=(orderId,userInfo)=>{
        deleteOrder(orderId,userInfo)
        loadOrders();
    }

  return (
    <div>
        <div className='container-fluid p-3'><h3 className='text-center'>Customer Orders <i class="fa fa-shopping-bag"></i></h3>
        {
            orders.map((order,index)=>
                order.transaction==='Successful'?
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
                                    <td colSpan="1" className="fs-5 fw-normal">#ECOD{order.orderId}</td>
                                    <td colSpan="1" className="fs-5 fw-normal">Order date: {new Date(order.orderDate).toDateString()}</td>
                                    <td colSpan="1" className="fs-5 fw-normal">Customer: {order.user.name}</td>
                                    <td colSpan="1" className="fs-5 fw-normal">Address: {order.shippingAddress}</td>
                                    <td colSpan="1" className="fs-5 fw-normal"> GrandTotal: {order.totalAmount} ₹</td>
                                    <td colSpan="1">
                                        <button className='btn btn-warning me-1' onClick={()=>handleDeleteOrder(order.orderId,userInfo)}>Approve Order</button>
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

export default ListOrders
