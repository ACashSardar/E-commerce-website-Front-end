import React from 'react'
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({sendLoginRequest, message}) => {
  return (
    <div className='bg-canvas p-5 d-flex justify-content-center'>
      <ToastContainer />
      <form className='shadow bg-light rounded-2 p-5 mt-5' style={{width:"22rem", height:"20rem"}} onSubmit={(e)=>sendLoginRequest(e)}>
          <label className='fs-3 fw-normal fw-bold text-dark'>LOG IN</label>
          {
            message===""?
            <p className='fs-6 fw-light text-secondary'>Please enter valid credentials</p>
            :<p className='fs-6 fw-light text-danger'>{message}</p>
          }
          <input className='form-control mb-1 rounded-2' type="text" placeholder='Enter your email' name='email' required/>
          <input className='form-control mb-1 rounded-2' type="password" placeholder='Enter your password' name='password' required/>
          <input className='btn btn-primary p-2' type="submit" value="Login" style={{width:"100%"}}/>
      </form>
    </div>
  )
}

export default Login
