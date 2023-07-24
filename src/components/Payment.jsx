import React from 'react'
import { Link, useNavigate,  } from 'react-router-dom'
import { clearCart, updateOrder } from '../services/EcommerceServices'
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = ({cartItems,loadOrders,currentOrder, loadCartitems}) => {
  const navigate =useNavigate()

  const handlePayment=(e,order)=>{
    e.preventDefault()
    const data={
      transaction:"Successful"
    }
    updateOrder(data,order.orderId).then(()=>{
      clearCart(cartItems)
      loadCartitems()
      loadOrders()
      toast('payment successful ✅')
      navigate("/")
    })
  }

  return (
    <div className='bg-canvas p-5 d-flex justify-content-center'>
      <form action="" className='shadow rounded-2 p-5 mt-5' style={{height:"22rem", width:"28rem"}} onSubmit={(e)=>handlePayment(e,currentOrder)}>
          <div className='d-flex justify-content-between'>
              <label className='text-primary fs-4 fw-bold'>Grand Total: </label>
              <label className='text-primary fs-4 fw-bold'>{currentOrder.totalAmount} ₹</label>
          </div>
          <br />
          <div className='d-flex justify-content-around mb-2'>
              <input type="text" className='form-control rounded-2 me-2' placeholder='Enter First Name'/>
              <input type="text" className='form-control rounded-2 me-2' placeholder='Enter Last Name'/>
          </div>
          <div className='d-flex justify-content-around mb-2'>
              <input type="text" className='form-control rounded-2 me-2' placeholder='Enter Card Number'/>
              <input type="text" className='form-control rounded-2 me-2' placeholder='Enter CVV'/>
          </div>
          <div className='d-flex justify-content-around mb-2'>
              <span className='badge text-primary fs-5'>Valid until: </span>
              <input type="text" className='form-control rounded-2 me-2' placeholder='Month'/>
              <input type="text" className='form-control rounded-2 me-2' placeholder='Year'/>
          </div>
          <div className='d-flex justify-content-between mb-1 pe-2'>
              <Link to="/order" className='btn btn-secondary fw-bold rounded-2 me-2' >Cancel</Link>
              <button className='btn btn-primary border-secondary rounded-2' style={{width:"80%"}}>Pay {currentOrder.totalAmount} ₹</button>
          </div>
      </form>
    </div>
  )
}

export default Payment
