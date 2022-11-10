import React from 'react'
import { Link } from 'react-router-dom'
import { updateOrder,deleteOrder, updateDelivery } from '../services/EcommerceServices';

const Order = ({orders, loadOrders, currentUser}) => {

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

    const handleUpdateOrder=(orderId,e,userInfo)=>{
        e.preventDefault();

        console.log(e.target.elements);
        const deliveryStatus=e.target.elements.deliveryStatus.value;
        const deliveryDate=e.target.elements.deliveryDate.value;

        if(deliveryStatus==="" || deliveryDate==="") return ;
        const data={
            deliveryStatus:deliveryStatus,
            deliveryDate:deliveryDate
        }

        updateDelivery(orderId,data,userInfo).then((res)=>{
            loadOrders();
        })
    }
  return (
    <div className='container-fluid p-3 '><span className='fw-light fs-4 accent1-bg badge rounded-0'><i class="fa fa-shopping-bag"></i> My Orders :</span>
    {
        orders.map((order,index)=>
                <div className='d-flex justify-content-center'>
                    <table className='table table-hover border my-1'>
                        <thead>
                            <tr className='bg-secondary text-light'>
                                <th className="fs-5 fw-light">Product ID</th>
                                <th className="fs-5 fw-light">Name</th>
                                <th className="fs-5 fw-light">Price</th>
                                <th className="fs-5 fw-light">Image</th>
                                <th className="fs-5 fw-light">Quantity</th>
                                <th className="fs-5 fw-light">Sub Total</th>
                                <th className="fs-5 fw-light">Delivery Status</th>
                                <th className="fs-5 fw-light">Expected Delivery time</th>
                                <th className="fs-5 fw-light">Delivery Man</th>
                                <th className="fs-5 fw-light">Delivery Man PhNo.</th>
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
                                    <td className="fs-6 fw-light">{orderItem.quantity*orderItem.product.price} ₹</td>
                                    <td className="fs-6 fw-light">{order.deliveryStatus==null?"Pending":order.deliveryStatus}</td>
                                    <td className="fs-6 fw-light">{order.deliveryDate==null?"Pending":new Date(order.deliveryDate).toDateString()}</td>
                                    <td className="fs-6 fw-light">{order.deliveryPerson==null?"Pending":order.deliveryPerson.name}</td>
                                    <td className="fs-6 fw-light">{order.deliveryPerson==null?"Pending":order.deliveryPerson.phoneNo}</td>
                                </tr>
                            )
                        }
                        {
                            order.transaction!=='Successful'?
                            <>
                                <tr className='accent1-bg'>
                                    <td colSpan="2" className="fs-6 fw-normal text-light">Order ID: ECOD{order.orderId}</td>
                                    <td colSpan="2" className="fs-6 fw-light text-light">{order.user.name} ({order.user.phoneNo})</td>
                                    <td colSpan="1" className="fs-6 fw-normal text-light"> Total: {order.totalAmount} ₹</td>
                                    {
                                        (order.shippingAddress===""||order.shippingAddress===null)?
                                        <td colSpan="2" className="fs-6 fw-light text-danger">Please add shipping address !</td>
                                        :<td colSpan="2" className="fs-6 fw-light text-light">Shipping Address: {order.shippingAddress}</td>
                                    }
                                    <td colSpan="1" className="fs-6 fw-light text-light">Order date: {new Date(order.orderDate).toDateString()}</td>
                                    <td colSpan="4" className='d-flex'>
                                        <form onSubmit={(e)=>handleSubmit(e,order.orderId,userInfo)} className="d-flex">
                                            <input type="text" className='form-control-sm rounded-0 border-light' name="shippingAddress" placeholder='Enter Shipping Address'/>
                                            <button className='btn btn-dark btn-sm rounded-0'>Update</button>
                                        </form>
                                    </td>
                                    <td colSpan="2">
                                        <button className='btn btn-danger btn-sm rounded-0 me-1' onClick={()=>handleDeleteOrder(order.orderId,userInfo)}>Delete Order</button>
                                        {
                                            (order.shippingAddress===""||order.shippingAddress===null)?
                                            <></>
                                            :<Link to="/payment"><button className='btn btn-primary btn-sm rounded-0' >Payment</button></Link>
                                        }
                                    </td>
                                </tr>
                            </>
                            :
                            <tr className='accent1-bg'>
                                <td colSpan="2" className="fs-6 fw-normal text-light">Order ID: ECOD{order.orderId}</td>
                                <td colSpan="2" className="fs-6 fw-light text-light">{order.user.name} ({order.user.phoneNo})</td>
                                <td colSpan="1" className="fs-6 fw-normal text-light"> Total: {order.totalAmount} ₹</td>
                                <td colSpan="2" className="fs-6 fw-light text-light">Address: {order.shippingAddress}</td>
                                <td colSpan="1" className="fs-6 fw-light text-light">Order date: {new Date(order.orderDate).toDateString()}</td>
                                {
                                    currentUser.role==="ROLE_USER"?
                                    <td colSpan="2" className="fs-6">
                                        {
                                            order.deliveryStatus=="Delivered"?
                                            <span className='badge bg-light m-0 py-2 text-dark rounded-0'>📦Order Received</span>
                                            :<span className='badge bg-light m-0 py-2 text-dark rounded-0'>🕒Pending Arrival</span>
                                        }
                                    </td>
                                    :
                                    <td colSpan="2" className="fs-6">
                                        <form className='d-flex' onSubmit={(e)=>handleUpdateOrder(order.orderId,e,userInfo)}>
                                            <select className='form-select me-1' name="deliveryStatus" id="">
                                                <option value="">Delivery Status</option>
                                                <option value="🏠In office">In office</option>
                                                <option value="🚵🏻‍♂️On the way">On the way</option>
                                                <option value="✅Delivered">Delivered</option>
                                            </select>
                                            <input className='form-control me-1' type="date" name="deliveryDate"/>
                                            <button className='btn btn-light'>Update</button>
                                        </form>
                                    </td>
                                }
                            </tr>
                        }
                        </tbody>
                    </table>
                </div>
        )
    }
    </div>
  )
}

export default Order
