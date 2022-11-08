import React from 'react'
import Carousal from "./Carousal";
import MainBody from './MainBody';
import { Link} from 'react-router-dom';
import { addCartItem } from '../services/EcommerceServices';

const Homepage = ({products,setProducts,categories,selectedProductId,setSelectedProductId,quantity, setQuantity,loadCartitems}) => {

  const userInfo=JSON.parse(localStorage.getItem("userInfo"));

  const handleAddCartItem= (productId,qty,userInfo)=>{
    const data={quantity:qty,paymentStatus:"NP"}
     addCartItem(data,productId,userInfo).then(()=>{
      loadCartitems()
    })
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
              <div className="card d-flex" style={{width:"18rem"}} >
                <img src={`http://localhost:8080/api/v1/products/image/${product.imageURL}`} className="card-img-top" alt="..." style={{height:"100%"}}/>
              </div>
              <div className="card">
                {
                  <table className='table border'>
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
                          <select className='form-select' value={quantity} name="quantity" onChange={(e)=>{
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
                        <td><button className='btn btn-secondary' onClick={()=>setSelectedProductId(0)} style={{width:"100%"}}>Cancel</button></td>
                        <td><Link to="/cart"><button className='btn btn-success' style={{width:"100%"}} onClick={()=>handleAddCartItem(product.productId,quantity,userInfo)}>Add to Cart</button></Link></td>
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
