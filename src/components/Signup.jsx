import React from 'react'

const Signup = ({signup}) => {
  return (
    <div className='bg-canvas p-5 d-flex justify-content-center'>
      <form action="" className='shadow bg-light rounded-2 p-5' style={{width:"22rem"}} onSubmit={(e)=>signup(e)}>
        <div className='mb-2'>
          <label className='fs-3 fw-bold text-dark text-center'>SIGN UP</label>
        </div>
        <input className='form-control mb-1 rounded-2' type="text" placeholder='Enter your name' name='name'/>
        <input className='form-control mb-1 rounded-2' type="text" placeholder='Enter your email' name='email'/>
        <input className='form-control mb-1 rounded-2' type="password" placeholder='Enter your password' name='password'/>
        <input className='form-control mb-1 rounded-2' type="text" placeholder='Enter your address' name='address'/>
        <input className='form-control mb-1 rounded-2' type="text" placeholder='Enter your phone number' name='phoneNo'/>
        <select className='form-select mb-1 rounded-2' name="role" >
          <option value="ROLE_USER">USER</option>
          <option value="ROLE_ADMIN">ADMIN</option>
          <option value="ROLE_DELIVERY">DELIVERY MAN</option>
        </select>
        <input className='btn btn-primary p-2' type="submit" value="Sign Up" style={{width:"100%"}}/>
      </form>
    </div>
  )
}

export default Signup
