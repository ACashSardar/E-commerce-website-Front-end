import React from 'react'

const Login = ({sendLoginRequest,message}) => {
  return (
    <div className='bg-canvas p-5 d-flex justify-content-center'>
      <form action="" className='border p-3 my-5 bg-light' style={{width:"25rem",height:"18rem"}} onSubmit={(e)=>sendLoginRequest(e)}>
          <label className='fs-3 fw-normal fw-bold text-dark'>LOG IN</label>
          {
            message===""?
            <p className='fs-6 fw-light text-secondary'>Please enter proper credentials.</p>
            :<p className='fs-6 fw-light text-danger'>{message}</p>
          }
          <hr />
          <input className='form-control mb-2 rounded-0' type="text" placeholder='Enter your email' name='email' required/>
          <input className='form-control mb-2 rounded-0' type="text" placeholder='Enter your password' name='password' required/>
          <input className='custom-btn' type="submit" value="Login"/>
      </form>
    </div>
  )
}

export default Login
