import React from 'react'
import { Link, useNavigate,  } from 'react-router-dom'
import { clearCart, updateOrder } from '../services/EcommerceServices'

const Payment = ({orders,cartItems}) => {
  const navigate =useNavigate()

  const handlePayment=(e,order)=>{
    e.preventDefault()
    const data={
      transaction:"Successful"
    }
    updateOrder(data,order.orderId)
    alert('payment successful')
    clearCart(cartItems)
    navigate("/")
  }

  return (
    <div>
      <div className='container-fluid d-flex justify-content-center'>
        <form action="" className='my-5 py-3 px-5 border bg-light shadow' style={{width:"40rem"}} onSubmit={(e)=>handlePayment(e,orders[0])}>
            <div className='d-flex justify-content-between'>
                <span className='badge bg-light text-dark fs-4'>Total</span>
                <span className='badge bg-light text-dark fs-4'>{orders[0].totalAmount} ₹</span>
            </div>
            <hr />
            <div className='d-flex justify-content-around mb-3'>
                <input type="text" className='form-control me-2' placeholder='Enter First Name'/>
                <input type="text" className='form-control me-2' placeholder='Enter Last Name'/>
            </div>
            <div className='d-flex justify-content-around mb-3'>
                <input type="text" className='form-control me-2' placeholder='Enter Card Number'/>
                <input type="text" className='form-control me-2' placeholder='Enter CVV'/>
            </div>
            <div className='d-flex justify-content-around mb-3'>
                <span className='badge bg-light text-dark fs-5'>Valid until: </span>
                <input type="text" className='form-control me-2' placeholder='Month'/>
                <input type="text" className='form-control me-2' placeholder='Year'/>
            </div>
            <div className='d-flex justify-content-between mb-3'>
                <Link to="/order" className='btn btn-secondary me-2' style={{width:"30%"}}>Cancel</Link>
                <button className='btn btn-success' style={{width:"98%"}}>💳Pay {orders[0].totalAmount} ₹</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Payment
