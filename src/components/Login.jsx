import React from 'react'

const Login = ({sendLoginRequest}) => {
  return (
    <div>
        <div className='d-flex justify-content-center'>
        <form action="" className='border p-5 my-5' style={{width:"40rem"}} onSubmit={(e)=>sendLoginRequest(e)}>
            <p className='fs-4 fw-light'>LOGIN PAGE</p>
            <input className='form-control mb-2' type="text" placeholder='Enter your email' name='email'/>
            <input className='form-control mb-2' type="text" placeholder='Enter your password' name='password'/>
            <input className='btn btn-success' type="submit" value="Login"/>
        </form>
    </div>
    </div>
  )
}

export default Login
