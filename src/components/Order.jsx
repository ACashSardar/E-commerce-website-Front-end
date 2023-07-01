import React from 'react'
import { Link } from 'react-router-dom'
import { updateOrder,deleteOrder, updateDelivery } from '../services/EcommerceServices';

const Order = ({orders, loadOrders, currentUser,setCurrentOrder,loading,setLoading}) => {

    const userInfo=JSON.parse(localStorage.getItem("userInfo"));

    const handleSubmit=(e,orderId,userInfo)=>{
        e.preventDefault()
        setLoading(true)
        const shipAddr=e.target.elements.shippingAddress.value
        e.target.elements.shippingAddress.value=""
        const data={
            shippingAddress:shipAddr,
        }
        updateOrder(data,orderId,userInfo).then((res)=>{
            loadOrders();
            setLoading(false)
        })
    }

    const handleDeleteOrder=(orderId,userInfo)=>{
        setLoading(true)
        deleteOrder(orderId,userInfo).then((res)=>{
            loadOrders();
            setLoading(false)
        })
    }

    const handleUpdateOrder=(orderId,e,userInfo)=>{
        e.preventDefault();
        setLoading(true)
        console.log(e.target.elements);
        const deliveryStatus=e.target.elements.deliveryStatus.value;
        const deliveryDate=e.target.elements.deliveryDate.value;

        if(deliveryStatus==="" || deliveryDate==="") return ;
        const data={
            deliveryStatus:deliveryStatus,
            deliveryDate:deliveryDate
        }

        updateDelivery(orderId,data,userInfo).then((res)=>{
            setLoading(false)
            loadOrders();
        })
    }
  return (
    <div className='bg-canvas p-5'>
    {
        loading?
        <div className='container-fluid text-center' style={{width:"100%"}} disabled>
            Loading...
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </div>
        :<div>
            {
                orders.map((order,index)=>
                        <div className='d-flex justify-content-center'>
                            <table className='table table-hover border my-2'>
                                <thead>
                                    <tr className='bg-light'>
                                        <th className="fs-6 fw-bold">Product ID</th>
                                        <th className="fs-6 fw-bold">Name</th>
                                        <th className="fs-6 fw-bold">Price</th>
                                        <th className="fs-6 fw-bold">Image</th>
                                        <th className="fs-6 fw-bold">Quantity</th>
                                        <th className="fs-6 fw-bold">Sub Total</th>
                                        <th className="fs-6 fw-bold">Delivery Status</th>
                                        <th className="fs-6 fw-bold">Expected Delivery time</th>
                                        <th className="fs-6 fw-bold">Delivery Man</th>
                                        <th className="fs-6 fw-bold">Delivery Man PhNo.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    order.orderItems.map((orderItem,index)=>
                                        <tr>
                                            <td className="fs-6 fw-light">ECPD{orderItem.product.productId}</td>
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
                                        <tr>
                                            <td colSpan="2" className="fs-6 fw-normal">Order ID: ECOD{order.orderId}</td>
                                            <td colSpan="2" className="fs-6 fw-light">{order.user.name} ({order.user.phoneNo})</td>
                                            <td colSpan="1" className="fs-6 fw-bold text-primary"> Total: {order.totalAmount} ₹</td>
                                            {
                                                (order.shippingAddress===""||order.shippingAddress===null)?
                                                <td colSpan="2" className="fs-6 fw-light text-danger">Please add shipping address.</td>
                                                :<td colSpan="2" className="fs-6 fw-light">Shipping Address: {order.shippingAddress}</td>
                                            }
                                            <td colSpan="1" className="fs-6 fw-light">Order date: {new Date(order.orderDate).toDateString()}</td>
                                            <td colSpan="4" className='d-flex'>
                                                <form onSubmit={(e)=>handleSubmit(e,order.orderId,userInfo)} className="d-flex">
                                                    <input type="text" className='form-control-sm rounded-0 border' name="shippingAddress" placeholder='Enter Shipping Address'/>
                                                    <button className='btn btn-primary btn-sm fw-bold rounded-0'>Update</button>
                                                </form>
                                            </td>
                                            <td colSpan="2">
                                                <button className='btn btn-danger btn-sm fw-bold rounded-0 me-2' onClick={()=>handleDeleteOrder(order.orderId,userInfo)}>Delete</button>
                                                {
                                                    (order.shippingAddress===""||order.shippingAddress===null)?
                                                    <></>
                                                    :<Link to="/payment"><button className='btn btn-success btn-sm text-light fw-bold rounded-0' onClick={()=>{setCurrentOrder(order)}}>Buy Now</button></Link>
                                                }
                                            </td>
                                        </tr>
                                    </>
                                    :
                                    <tr>
                                        <td colSpan="2" className="fs-6 fw-normal">Order ID: ECOD{order.orderId}</td>
                                        <td colSpan="2" className="fs-6 fw-light">{order.user.name} ({order.user.phoneNo})</td>
                                        <td colSpan="1" className="fs-6 fw-bold text-primary"> Paid: {order.totalAmount} ₹</td>
                                        <td colSpan="2" className="fs-6 fw-light">Address: {order.shippingAddress}</td>
                                        <td colSpan="1" className="fs-6 fw-light">Order date: {new Date(order.orderDate).toDateString()}</td>
                                        {
                                            currentUser.role==="ROLE_USER"?
                                            <td colSpan="2" className="fs-6">
                                                {
                                                    order.deliveryStatus==="✅Delivered"?
                                                    <span className='m-0 py-2 text-success rounded-0'>📦 Order Received</span>
                                                    :<span className='m-0 py-2 text-danger rounded-0'>🕒 Pending Arrival</span>
                                                }
                                            </td>
                                            :
                                            <td colSpan="2" className="fs-6">
                                                <form className='d-flex' onSubmit={(e)=>handleUpdateOrder(order.orderId,e,userInfo)}>
                                                    <select className='form-select-sm rounded-0 border-light me-1' name="deliveryStatus" id="">
                                                        <option value="">Delivery Status</option>
                                                        <option value="🏠In office">In office</option>
                                                        <option value="🚵🏻‍♂️On the way">On the way</option>
                                                        <option value="✅Delivered">Delivered</option>
                                                    </select>
                                                    <input className='form-control-sm rounded-0 border-0 me-1' type="date" name="deliveryDate" required/>
                                                    <button className='btn btn-secondary btn-sm border-light rounded-0'>Update</button>
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
    }

    </div>
  )
}

export default Order
