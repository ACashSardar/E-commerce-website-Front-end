import React from 'react'

const Signup = ({signup}) => {
  return (
    <div className='bg-canvas p-5 d-flex justify-content-center'>
      <form action="" className='border p-3 bg-light' style={{width:"25rem", height:"29rem"}} onSubmit={(e)=>signup(e)}>
        <label className='fs-3 fw-bold text-dark'>SIGN UP</label>
        <p className='fs-6 fw-light text-secondary'>Please fill the form to create an account!</p>
        <hr />
        <input className='form-control mb-2 rounded-0' type="text" placeholder='Enter your name' name='name'/>
        <input className='form-control mb-2 rounded-0' type="text" placeholder='Enter your email' name='email'/>
        <input className='form-control mb-2 rounded-0' type="text" placeholder='Enter your password' name='password'/>
        <input className='form-control mb-2 rounded-0' type="text" placeholder='Enter your address' name='address'/>
        <input className='form-control mb-2 rounded-0' type="text" placeholder='Enter your phone number' name='phoneNo'/>
        <select className='form-select mb-2 rounded-0' name="role" >
          <option value="ROLE_USER">USER</option>
          <option value="ROLE_ADMIN">ADMIN</option>
          <option value="ROLE_DELIVERY">DELIVERY MAN</option>
        </select>
        <input className='custom-btn' type="submit" value="Sign Up"/>
      </form>
    </div>
  )
}

export default Signup
