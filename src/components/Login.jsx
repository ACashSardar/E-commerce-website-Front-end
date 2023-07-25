import React from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({sendLoginRequest, message}) => {
  return (
    <div className='bg-canvas p-5 d-flex justify-content-center'>
      <ToastContainer />
      <form className='shadow bg-light rounded-1 p-5 mt-5' style={{width:"22rem", height:"20rem"}} onSubmit={(e)=>sendLoginRequest(e)}>
          <b className='fs-3'>LOG IN</b>
          {
            message===""?
            <p className='fs-6 fw-light text-secondary'>Please enter valid credentials</p>
            :<p className='fs-6 fw-light text-danger'>{message}</p>
          }
          <input className='form-control mb-1 rounded-1' type="text" placeholder='Enter your email' name='email' required/>
          <input className='form-control mb-1 rounded-1' type="password" placeholder='Enter your password' name='password' required/>
          <input className='custom-btn mb-1' type="submit" value="Login" style={{width:"100%"}}/>
          <Link to="/signup" className='text-decoration-none link-dark'>Don't have an account yet? <b>Sign Up</b></Link>
      </form>

    </div>
  )
}

export default Login
