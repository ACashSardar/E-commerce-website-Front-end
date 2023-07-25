import React from 'react'
import { assignDelivery } from '../services/EcommerceServices';

const ListOrders = ({orders, loadOrders, userList,loading}) => {

    const userInfo=JSON.parse(localStorage.getItem("userInfo"));

    const deliveryPeople=userList.filter((user)=>{
        return user.role==="ROLE_DELIVERY"
    })

    const handleAssignOrder=(orderId,e,userInfo)=>{
        e.preventDefault();
        const deliveryPersonId=e.target.elements.deliveryPerson.value;
        if(deliveryPersonId==="") return;
        assignDelivery(orderId,deliveryPersonId,userInfo).then((res)=>{
            loadOrders();
        })
    }

  return (

    <div className='bg-canvas d-flex justify-content-center p-5'>
    {
        loading?
        <div className='text-light text-center' style={{width:"100%"}} disabled>
            Loading...
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </div>
        :<div style={{width:"70%"}}>
            {
            orders.length>0 ?
                <div>
                    {
                        orders
                        .filter((order, index)=>order.transaction==='Successful')
                        .map((order,index)=>
                            <div className='shadow bg-light rounded-1 p-4 mb-3'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <b className='fs-5'>Order ID: ECOD{order.orderId}</b>
                                    </div>
                                    <div className='col-md-6 text-end'>
                                        <b className='fs-5'>Paid: ₹ {order.totalAmount}</b>
                                    </div>
                                </div>
                                <hr />
                                <div className='row'>
                                    <div className="col-md-6">
                                        <h6>Order date: {new Date(order.orderDate).toLocaleString()}</h6>
                                        <h6>Recipient: {order.user.name}</h6>
                                        <h6>Email: {order.user.email}</h6>
                                        <h6>Phone: {order.user.phoneNo} </h6>
                                        <h6>Shipping Address: {order.shippingAddress}</h6>
                                        <h6>Delivery Status: {order.deliveryStatus==null?"Pending":order.deliveryStatus}</h6>
                                        <h6>Expected Delivery Date: {order.deliveryDate==null?"Pending":new Date(order.deliveryDate).toDateString()}</h6>
                                        <h6>Delivery Person: {order.deliveryPerson==null?"Pending":order.deliveryPerson.name}</h6>
                                        <h6>Delivery Person Phone: {order.deliveryPerson==null?"Pending":order.deliveryPerson.phoneNo}</h6>
                                        {
                                            order.deliveryStatus==="✅Delivered"?
                                            <span className='fs-6 p-2 rounded-1'>✅Order Delivered.</span>
                                            :                                    
                                            <form className='d-flex' onSubmit={(e)=>handleAssignOrder(order.orderId,e,userInfo)}>
                                                <select className='form-select rounded-1 me-1' name="deliveryPerson" id="" style={{width:"13rem"}}>
                                                    <option value="">Select a delivery person</option>
                                                    {
                                                        deliveryPeople.map((dp,index)=>
                                                            <option value={dp.userId}>{dp.name}</option>
                                                        )
                                                    }
                                                    
                                                </select>
                                                <button className='custom-btn px-4'>Save</button>
                                            </form>
                                        }
                                    </div>
                                    <div className="col-md-6">
                                        <ul>
                                        {
                                            order.orderItems.map((orderItem,index)=>
                                                <li>
                                                    <span className='d-flex'>
                                                        <h6 className='text-secondary fw-bold me-2'>{orderItem.quantity} x </h6>
                                                        <h6>{orderItem.product.productName}</h6>
                                                    </span>
                                                </li>
                                            )
                                        }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                :
                <div className='text-center text-secondary'>
                    <h5>Order list is currently empty.</h5>
                </div>
            }
        </div>
    }
    </div>
  )
}

export default ListOrders
