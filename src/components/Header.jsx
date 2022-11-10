import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({logout,loadCurrentUser}) => {

    const userInfo=JSON.parse(localStorage.getItem("userInfo"));
    const username=userInfo?userInfo.username:null;

  return (
    <header>
        <nav className='navbar navbar-expand-lg px-2 py-3 accent1-bg shadow'>
            <div className="container-fluid">
                <img src="https://seeklogo.com/images/E/e-commerce-logo-B0AE7EE720-seeklogo.com.png" alt="" className="brand-logo" />
                {/* <Link className="navbar-brand fs-3 ms-2 text-light fw-bold" href="#">E-commerce App</Link> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link link-light fs-5" to="/"><i className='fa fa-home'></i> Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link link-light fs-5" to="/cart"><i className='fa fa-shopping-cart'></i> My Cart</Link>
                        </li>
                        <li className="nav-item">
                                <Link className="nav-link link-light fs-5" to="/order"><i className='fa fa-usd'></i> My Orders</Link>
                        </li>
                        {/* {
                            userRole==="ROLE_ADMIN" ?
                        <> */}
                            <li className="nav-item">
                                <Link className="nav-link link-light fs-5" to="/category"><i className='fa fa-list-alt'></i> Category</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link link-light fs-5" to="/supplier"><i className='fa fa-industry'></i> Supplier</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link link-light fs-5" to="/product"><i className='fa fa-gift'></i> Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link link-light fs-5" to="/customerOrders"><i className='fa fa-usd'></i> Customer Orders</Link>
                            </li>
                        {/* </>
                        :<></>
                        }

                        { 
                        
                        username===""?
                        <> */}
                            <li className="nav-item">
                                <Link className="nav-link link-light fs-5" to="/login"><i className='fa fa-sign-in'></i> Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link link-light fs-5" to="/signup"><i className='fa fa-user-plus'></i> SignUp</Link>
                            </li>
                        {/* </>
                        :<></>
                        }

                        { username!==""?
                        <> */}

                            <li className="nav-item">
                                <label className="nav-link link-light fs-5" onClick={()=>logout()}><i className='fa fa-sign-out'></i> Log out</label>
                            </li>
                            
                        {/* </>
                        :<></>
                        } */}
                        
                        <li className="nav-item">
                            <Link className="nav-link link-light fs-5" to="/account"><i className='fa fa-user'></i> {username?username:"unregistered user"}</Link>
                        </li>                      
                    </ul>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Header
