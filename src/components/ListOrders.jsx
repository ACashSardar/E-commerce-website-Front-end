import React from 'react'
import { assignDelivery } from '../services/EcommerceServices';

const ListOrders = ({orders, loadOrders, userList}) => {

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

    <div className='container-fluid p-3 '><span className='fw-light fs-4 accent1-bg badge rounded-0'><i class="fa fa-shopping-bag"></i> Customer Orders :</span>
    {
        orders.map((order,index)=>
            order.transaction==='Successful'?
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
                            <tr className='accent1-bg'>
                                <td colSpan="2" className="fs-6 fw-normal text-light">Order ID: ECOD{order.orderId}</td>
                                <td colSpan="2" className="fs-6 fw-light text-light">{order.user.name} ({order.user.phoneNo})</td>
                                <td colSpan="1" className="fs-6 fw-normal text-light">Total: {order.totalAmount} ₹</td>
                                <td colSpan="2" className="fs-6 fw-light text-light">Address: {order.shippingAddress}</td>
                                <td colSpan="1" className="fs-6 fw-light text-light">Order date: {new Date(order.orderDate).toDateString()}</td>
                                <td colSpan="2">
                                    <form className='d-flex' onSubmit={(e)=>handleAssignOrder(order.orderId,e,userInfo)}>
                                        <select className='form-select me-1' name="deliveryPerson" id="">
                                            <option value="">Select a delivery person</option>
                                            {
                                                deliveryPeople.map((dp,index)=>
                                                    <option value={dp.userId}>{dp.name}</option>
                                                )
                                            }
                                            
                                        </select>
                                        <button className='btn btn-light me-1'>Assign</button>
                                    </form>
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
  )
}

export default ListOrders
