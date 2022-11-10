import React from 'react'
import { useState } from 'react'
import { updateUser } from '../services/EcommerceServices'

const Account = ({currentUser,loadCurrentUser}) => {
  const [editing, setEditing]=useState(false)
  console.log(currentUser);
  const [name, setName]=useState(currentUser===null?"":currentUser.name)
  const [address, setAddress]=useState(currentUser===null?"":currentUser.address)
  const [phoneNo, setPhoneNo]=useState(currentUser===null?"":currentUser.phoneNo)

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
      setEditing(false)
    })
    
  }

  return (
    <div>
      {
        currentUser!=null?
        <div className='container-fluid d-flex justify-content-center'>
          {
            editing===false?
              <div className="bg-light p-3 my-5 border border rounded-0" style={{width:"20rem"}}>
                <label className='fs-3 fw-normal text-success'>MY ACCOUNT</label>
                <hr />
                <p className='fs-5 fw-light'>Name: {currentUser.name}</p>
                <p className='fs-5 fw-light'>Email: {currentUser.email}</p>
                <p className='fs-5 fw-light'>Phone: {currentUser.phoneNo}</p>
                <p className='fs-5 fw-light'>Address: {currentUser.address}</p>
                <p className='fs-5 fw-light'>Role: {currentUser.role}</p>
                <button  className='custom-btn' onClick={()=>setEditing(true)}>Edit Account</button>
              </div>
              :
              <div className="bg-light p-3 my-5 border border rounded-0" style={{width:"20rem"}}>
                <label className='fs-3 fw-normal text-success'>EDIT ACCOUNT</label>
                <hr />
                <p className='fs-5 fw-light'>Name: <input type="text" className='form-control-sm bg-light fw-light border-dark border-0 border-bottom rounded-0' style={{outline:"none"}} value={name} onChange={(e)=>setName(e.target.value)}/></p>
                <p className='fs-5 fw-light'>Email: {currentUser.email}</p>
                <p className='fs-5 fw-light'>Phone: <input type="text" className='form-control-sm bg-light fw-light border-dark border-0 border-bottom rounded-0' style={{outline:"none"}} value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)}/></p>
                <p className='fs-5 fw-light'>Address: <input type="text" className='form-control-sm bg-light fw-light border-dark border-0 border-bottom rounded-0' style={{outline:"none"}} value={address} onChange={(e)=>setAddress(e.target.value)}/></p>
                <p className='fs-5 fw-light'>Role: {currentUser.role}</p>
                <button  className='custom-btn' onClick={()=>handleEditAccount(name,address,phoneNo)}>Update Account</button>
              </div>
          }

        </div>
        :<>
          <h2>Please Log In</h2>
        </>
      }
    </div>
  )
}

export default Account
