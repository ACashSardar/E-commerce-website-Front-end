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
                    order.transaction==='Successful'?
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
                                    <tr>
                                        <td colSpan="2" className="fs-6 fw-normal">Order ID: ECOD{order.orderId}</td>
                                        <td colSpan="2" className="fs-6 fw-light">{order.user.name} ({order.user.phoneNo})</td>
                                        <td colSpan="1" className="fs-6 fw-normal">Total: {order.totalAmount} ₹</td>
                                        <td colSpan="2" className="fs-6 fw-light">Address: {order.shippingAddress}</td>
                                        <td colSpan="1" className="fs-6 fw-light">Order date: {new Date(order.orderDate).toDateString()}</td>
                                        <td colSpan="2">
                                            {
                                                order.deliveryStatus==="✅Delivered"?
                                                <span className='fs-6 p-2 rounded-0'>✅Order Delivered.</span>
                                                :                                    
                                                <form className='d-flex' onSubmit={(e)=>handleAssignOrder(order.orderId,e,userInfo)}>
                                                    <select className='form-select-sm rounded-0' name="deliveryPerson" id="">
                                                        <option value="">Select a delivery person</option>
                                                        {
                                                            deliveryPeople.map((dp,index)=>
                                                                <option value={dp.userId}>{dp.name}</option>
                                                            )
                                                        }
                                                        
                                                    </select>
                                                    <button className='btn btn-secondary btn-sm fw-bold rounded-0'>Assign</button>
                                                </form>
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
    }
    </div>
  )
}

export default ListOrders
