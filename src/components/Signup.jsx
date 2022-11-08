import React from 'react'

const Signup = ({signup}) => {
  return (
    <div className='d-flex justify-content-center'>
      <form action="" className='border p-5 my-5' style={{width:"35rem"}} onSubmit={(e)=>signup(e)}>
        <p className='fs-4 fw-light'>SIGN UP PAGE</p>
        <input className='form-control mb-2' type="text" placeholder='Enter your name' name='name'/>
        <input className='form-control mb-2' type="text" placeholder='Enter your email' name='email'/>
        <input className='form-control mb-2' type="text" placeholder='Enter your password' name='password'/>
        <input className='form-control mb-2' type="text" placeholder='Enter your address' name='address'/>
        <select className='form-select mb-2' name="role" >
          <option value="ROLE_USER">USER</option>
          <option value="ROLE_ADMIN">ADMIN</option>
        </select>
        <input className='btn btn-success' type="submit" value="Sign Up"/>
      </form>
    </div>
  )
}

export default Signup
