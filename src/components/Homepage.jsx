import React from 'react'
import Carousal from "./Carousal";
import MainBody from './MainBody';
import { Link, useNavigate} from 'react-router-dom';
import { addCartItem } from '../services/EcommerceServices';

const Homepage = ({products,setProducts,categories,selectedProductId,setSelectedProductId,quantity, setQuantity,loadCartitems,cartItems}) => {

  const userInfo=JSON.parse(localStorage.getItem("userInfo"));

  const navigate=useNavigate();

  const handleAddCartItem= (productId,qty,userInfo)=>{
    const setOfProducts=cartItems.map((item)=>item.product.productId)
    if(setOfProducts.includes(productId)){
      alert("This item is already present in your cart");
      return;
    }
    const data={quantity:qty,paymentStatus:"NP"}
     addCartItem(data,productId,userInfo).then(()=>{
      loadCartitems()
    })
    navigate("/cart")
  }

  return (
    <div>
      {
        selectedProductId===0?
        <Carousal/>
        :
        <>
          { products.map((product,index)=>
          <div>
            { product.productId===selectedProductId?
            <div className='container-fluid d-flex justify-content-center mt-5'>
              <div className="card rounded-0" style={{width:"20rem"}} >
                <img src={`http://localhost:8080/api/v1/products/image/${product.imageURL}`} className="card-img-top rounded-0" alt="..." style={{height:"100%"}}/>
              </div>
              <div className="card rounded-0 accent1-bg" style={{width:"20rem"}}>
                {
                  <table className='table text-light'>
                    <tbody>
                      <tr>
                        <td>Product Name: </td>
                        <td>{product.productName}</td>
                      </tr>
                      <tr>
                        <td>Description:</td>
                        <td>{product.productDesc}</td>
                      </tr>
                      <tr>
                        <td>Price:</td>
                        <td>{product.price} ₹ Only</td>
                      </tr>
                      <tr>
                        <td>In Stock:</td>
                        <td>{product.stock}</td>
                      </tr>
                      <tr>
                        <td>Select Quantity:</td>
                        <td>
                          <select className='form-select-sm rounded-0' value={quantity} name="quantity" style={{width:"100%"}} onChange={(e)=>{
                            setQuantity(e.target.value)
                          }}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td><button className='btn btn-light btn-sm rounded-0' onClick={()=>setSelectedProductId(0)} style={{width:"100%"}}>Cancel</button></td>
                        <td><button className='btn btn-dark btn-sm rounded-0' style={{width:"100%"}} onClick={()=>handleAddCartItem(product.productId,quantity,userInfo)}>Add to Cart</button></td>
                      </tr>
                    </tbody>
                  </table>
                }
              </div>
            </div>
          :<></>
          }
          </div>
      )}
        </>
      }

      <br /><hr />
      <MainBody products={products} setProducts={setProducts} categories={categories} selectedProductId={selectedProductId} setSelectedProductId={setSelectedProductId}/>
    </div>
  )
}

export default Homepage
