import React from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = ({logout,currentUser}) => {

    const userInfo=JSON.parse(localStorage.getItem("userInfo"));
    const username=userInfo?userInfo.username:null;

  return (
    <header>
        <ToastContainer />
        <nav className='navbar navbar-expand-lg bg-light fixed-top border-bottom py-3 px-2'>
            <div className="container-fluid">
                <img src="https://www.pngkit.com/png/full/364-3642224_clarity-ecommerce-logo-logo-e-commerce-png.png" alt="" className="brand-logo" style={{width: "200px"}} />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link fw-normal fs-6 me-2" to="/">HOME</Link>
                        </li>
                        { 
                            username!==null && currentUser.role==="ROLE_USER"?                       
                            <li className="nav-item">
                                <Link className="nav-link fw-normal fs-6 me-2" to="/cart">MY CART</Link>
                            </li>
                            :
                            <></>
                        }

                        { 
                            
                            username!==null && (currentUser.role==="ROLE_USER"||currentUser.role==="ROLE_DELIVERY")?

                            <li className="nav-item">
                                    <Link className="nav-link fw-normal fs-6 me-2" to="/order">MY ORDERS</Link>
                            </li>
                            :
                            <></>

                        }

                        {
                            currentUser.role==="ROLE_ADMIN" ?
                            <>
                                <li className="nav-item dropdown">
                                    <label className="nav-link dropdown-toggle fs-6 me-2" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        MY TASKS
                                    </label>
                                    <ul className="dropdown-menu rounded-0" aria-labelledby="navbarDropdown" style={{width: "200px"}}>
                                        <li><Link className="nav-link text-decoration-none fs-6 mx-3 my-2" to="/product">PRODUCT</Link></li>
                                        <li><Link className="nav-link text-decoration-none fs-6 mx-3 my-2" to="/category">CATEGORY</Link></li>
                                        <li><Link className="nav-link text-decoration-none fs-6 mx-3 my-2" to="/supplier">SUPPLIER</Link></li>
                                        <li><Link className="nav-link text-decoration-none fs-6 mx-3 my-2" to="/customerOrders">ORDERS</Link></li>
                                    </ul>
                                </li>
                            </>
                        :<></>

                        }

                        { 
                        
                        username===null?
                        <>
                            <li className="nav-item">
                                <Link className="nav-link fw-normal fs-6 me-2" to="/login">LOG IN</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fw-normal fs-6 me-2" to="/signup">SIGN UP</Link>
                            </li>
                        </>
                        :
                        <>
                            <li className="nav-item">
                                <label className="nav-link fw-normal fs-6 me-2" onClick={()=>logout()}>LOG OUT</label>
                            </li>     
                            <li className="nav-item">
                                <Link className="nav-link fw-normal fs-6 me-2" to="/account">MY ACCOUNT</Link>
                            </li>                     
                        </>

                        }              
                    </ul>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Header
