import React from 'react'
import { Link, useNavigate,  } from 'react-router-dom'
import { clearCart, updateOrder } from '../services/EcommerceServices'

const Payment = ({cartItems,loadOrders,currentOrder}) => {
  const navigate =useNavigate()

  const handlePayment=(e,order)=>{
    e.preventDefault()
    const data={
      transaction:"Successful"
    }
    updateOrder(data,order.orderId).then(()=>{
      alert('payment successful ✅')
      clearCart(cartItems)
      loadOrders()
      navigate("/")
    })
  }

  return (
    <div className='container-fluid d-flex justify-content-center bg-canvas'>
      <form action="" className='my-5 py-3 px-5 border bg-light rounded-0' style={{width:"40rem",height:"20rem"}} onSubmit={(e)=>handlePayment(e,currentOrder)}>
          <div className='d-flex justify-content-between'>
              <label className='text-primary fs-4 fw-bold'>Grand Total: </label>
              <label className='text-primary fs-4 fw-bold'>{currentOrder.totalAmount} ₹</label>
          </div>
          <hr />
          <div className='d-flex justify-content-around mb-3'>
              <input type="text" className='form-control rounded-0 me-2' placeholder='Enter First Name'/>
              <input type="text" className='form-control rounded-0 me-2' placeholder='Enter Last Name'/>
          </div>
          <div className='d-flex justify-content-around mb-3'>
              <input type="text" className='form-control rounded-0 me-2' placeholder='Enter Card Number'/>
              <input type="text" className='form-control rounded-0 me-2' placeholder='Enter CVV'/>
          </div>
          <div className='d-flex justify-content-around mb-3'>
              <span className='badge bg-light text-primary fs-4 fw-bold'>Valid until: </span>
              <input type="text" className='form-control rounded-0 me-2' placeholder='Month'/>
              <input type="text" className='form-control rounded-0 me-2' placeholder='Year'/>
          </div>
          <div className='d-flex justify-content-between mb-3'>
              <Link to="/order" className='btn btn-secondary fw-bold rounded-0 me-2' style={{width:"30%"}}>Cancel</Link>
              <button className='btn btn-success btn-sm fw-bold rounded-0' style={{width:"98%"}}>💳Pay {currentOrder.totalAmount} ₹</button>
          </div>
      </form>
    </div>
  )
}

export default Payment
