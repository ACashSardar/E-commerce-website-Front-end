import React from 'react'

const Login = ({sendLoginRequest}) => {
  return (
    <div>
        <div className='d-flex justify-content-center'>
        <form action="" className='border p-3 my-5 bg-light' style={{width:"25rem"}} onSubmit={(e)=>sendLoginRequest(e)}>
            <label className='fs-3 fw-normal text-success'>LOG IN</label>
            <p className='fs-6 fw-light text-secondary'>Please enter proper credentials!</p>
            <hr />
            <input className='form-control mb-2 rounded-0' type="text" placeholder='Enter your email' name='email'/>
            <input className='form-control mb-2 rounded-0' type="text" placeholder='Enter your password' name='password'/>
            <input className='custom-btn' type="submit" value="Login"/>
        </form>
    </div>
    </div>
  )
}

export default Login
