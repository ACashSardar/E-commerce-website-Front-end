import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { updateUser } from '../services/EcommerceServices'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Account = ({currentUser,loadCurrentUser}) => {
  const [editing, setEditing]=useState(false)
  const [name, setName]=useState()
  const [address, setAddress]=useState()
  const [phoneNo, setPhoneNo]=useState()

  useEffect(()=>{
    if(currentUser!==null){
      setName(currentUser.name)
      setAddress(currentUser.address)
      setPhoneNo(currentUser.phoneNo)
    }
  },[currentUser])


  const userInfo=JSON.parse(localStorage.getItem("userInfo"));

  const handleEditAccount=(name,address,phoneNo)=>{
    const data={
      email:currentUser.email,
      password:currentUser.password,
      role:currentUser.role,
      name:name,
      address:address,
      phoneNo:phoneNo
    }

    console.log(data);
    updateUser(currentUser.userId,data,userInfo).then((res)=>{
      loadCurrentUser()
      toast("User account updated");
      setEditing(false)
    })
    
  }

  return (
      <div className='bg-canvas p-5 d-flex justify-content-center'>
        <ToastContainer />
        {
          editing===false?
            <div className="bg-light p-3 border border rounded-0" style={{width:"20rem",height:"25rem"}}>
              <label className='fs-3 fw-bold text-dark'>MY ACCOUNT</label>
              <hr />
              {
                currentUser!==null && currentUser.email!==""?
                <div>
                  <p className='fs-5 fw-light'>Name: {currentUser.name}</p>
                  <p className='fs-5 fw-light'>Email: {currentUser.email}</p>
                  <p className='fs-5 fw-light'>Phone: {currentUser.phoneNo}</p>
                  <p className='fs-5 fw-light'>Address: {currentUser.address}</p>
                  <p className='fs-5 fw-light'>Role: {currentUser.role}</p>
                </div>
                :<div className='container-fluid text-center' style={{width:"100%"}}>
                  <p className='fs-5 fw-light'>I don't have an account yet.</p>
                  <a href='/signup' className='btn btn-primary rounded-0'>Register now</a>
                </div>
              }


              
              {
                currentUser.userId!==""?
                <button  className='custom-btn' onClick={()=>setEditing(true)}>Edit Account</button>
                :<></>                
              }
              
            </div>
            :
            <div className="bg-light p-3 border border rounded-0" style={{width:"20rem",height:"26rem"}}>
              <label className='fs-3 fw-bold text-dark'>EDIT ACCOUNT</label>
              <hr />
              <p className='fs-5 fw-light'>Name: <input type="text" className='form-control-sm bg-light fw-light border-dark border-0 border-bottom rounded-0' style={{outline:"none"}} value={name} onChange={(e)=>setName(e.target.value)}/></p>
              <p className='fs-5 fw-light'>Email: {currentUser.email}</p>
              <p className='fs-5 fw-light'>Phone: <input type="text" className='form-control-sm bg-light fw-light border-dark border-0 border-bottom rounded-0' style={{outline:"none"}} value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)}/></p>
              <p className='fs-5 fw-light'>Address: <input type="text" className='form-control-sm bg-light fw-light border-dark border-0 border-bottom rounded-0' style={{outline:"none"}} value={address} onChange={(e)=>setAddress(e.target.value)}/></p>
              <p className='fs-5 fw-light'>Role: {currentUser.role}</p>
              {
                currentUser.userId!==""?
                <button  className='custom-btn' onClick={()=>handleEditAccount(name,address,phoneNo)}>Update Account</button>
                :<></>                
              }
            </div>
        }
      </div>
  )
}

export default Account
