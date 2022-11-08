import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({logout,userRole}) => {

    const userInfo=JSON.parse(localStorage.getItem("userInfo"));
    const username=userInfo?userInfo.username:null;

  return (
    <header>
        <nav className='navbar navbar-expand-lg  navbar-light px-2 py-3 border-bottom shadow'>
            <div className="container-fluid">
                <img src="https://png.pngitem.com/pimgs/s/288-2881805_transparent-trolley-clipart-gray-shopping-cart-icon-hd.png" alt="" style={{width:"3rem",height:"3rem"}} />
                <Link className="navbar-brand fs-3 ms-2 text-success fw-bold" href="#">E-commerce App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link fs-5" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fs-5" to="/cart">Cart</Link>
                        </li>
                        {/* {
                            userRole==="ROLE_ADMIN" ?
                        <> */}
                            <li className="nav-item">
                                <Link className="nav-link fs-5" to="/category">Category</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-5" to="/supplier">Supplier</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-5" to="/product">Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-5" to="/customerOrders">Customer Orders</Link>
                            </li>
                        {/* </>
                        :<></>
                        }

                        { 
                        
                        username===""?
                        <> */}
                            <li className="nav-item">
                                <Link className="nav-link fs-5" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-5" to="/signup">SignUp</Link>
                            </li>
                        {/* </>
                        :<></>
                        }

                        { username!==""?
                        <> */}

                            <li className="nav-item">
                                <label className="nav-link fs-5 text-danger" onClick={()=>logout()}>Log out</label>
                            </li>
                            
                        {/* </>
                        :<></>
                        } */}
                        
                        <li className="nav-item">
                            <Link className="nav-link fs-5 text-dark" to="#">{username?username:"unregistered user"}</Link>
                        </li>                      
                    </ul>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Header
