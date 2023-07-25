import React,{ useState}  from 'react'
import {addProduct,deleteProduct,updateProduct} from "../services/EcommerceServices"
import { BASE_URL } from '../services/ServerBaseURL';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListProducts = ({products, loadProducts, categories, suppliers, loading, setLoading, handleSearch}) => {
  const [productName, setProductName]=useState("")
  const [productDesc, setProductDesc]=useState("")
  const [price, setPrice]=useState(0)
  const [stock, setStock]=useState(0)
  const [imageURL, setImageURL]=useState("")
  const [editing, setEditing]=useState(false)
  const [editItemId,setEditItemId]=useState(0)
  const [categoryId, setCategoryId]=useState(0)
  const [supplierId, setSupplierId]=useState(0)
  const dummyImageURL="https://optinmonster.com/wp-content/uploads/2019/01/cart-abandonment-statistics.png"

  const userInfo=JSON.parse(localStorage.getItem("userInfo"));

  const handleAddProduct=(e,userInfo)=>{
    e.preventDefault()
    const file=e.target.elements[6].files[0]
    const productName=e.target.elements.productName.defaultValue
    const productDesc=e.target.elements.productDesc.defaultValue
    const price=e.target.elements.price.defaultValue
    const stock=e.target.elements.stock.defaultValue
    const formData = new FormData();
    formData.append('file', file);
    const data={"productName":productName,"productDesc":productDesc,"price":parseInt(price),"stock":parseInt(stock),"imageURL":"","catId":categoryId,"supId":supplierId}
    const json=JSON.stringify(data)
    const blob = new Blob([json], {
      type: 'application/json'
    });
    formData.append("document", blob)

     addProduct(formData,categoryId,supplierId,userInfo).then((res)=>{
      setProductDesc('')
      setProductName('')
      setPrice(0)
      setStock(0)
      document.getElementById("product-img").src=dummyImageURL
      setCategoryId(0)
      setSupplierId(0)
      loadProducts()
      toast("Product added successfully.");
    })
  }

  const handleDeleteProduct=(productId,userInfo)=>{
     deleteProduct(productId,userInfo).then((res)=>{
      loadProducts()
      toast("Product deleted successfully.");
    })
  }

  const handleUpdateProduct=(e,productId,userInfo)=>{
    e.preventDefault()
    const productName=e.target.elements.productName.defaultValue
    const productDesc=e.target.elements.productDesc.defaultValue
    const price=e.target.elements.price.defaultValue
    const stock=e.target.elements.stock.defaultValue

    const data={"productName":productName,"productDesc":productDesc,"price":parseInt(price),"stock":parseInt(stock),"imageURL":"","catId":categoryId,"supId":supplierId}

     updateProduct(data,productId,userInfo).then((res)=>{
      setProductDesc('')
      setProductName('')
      setPrice(0)
      setStock(0)
      setCategoryId(0)
      setSupplierId(0)
      setEditItemId(0)
      setEditing(false)
      loadProducts()
      toast("Product updated successfully.");
    })
  }

  const loadImage=(e)=>{
    const file=e.target.files[0];
    if(file){
      const reader=new FileReader();
      reader.onload=function(){
          const result=reader.result;
          document.getElementById("product-img").src=result;
      };
      reader.readAsDataURL(file);
    }
  }

  return (
      <div className="bg-canvas p-5" >
        
          { editing ? 
              <form className="shadow bg-light p-5 mx-auto mb-5 rounded-1" style={{maxWidth:"40rem"}} onSubmit={(e)=>handleUpdateProduct(e,editItemId,userInfo)}>
                <label className='fs-4 fw-bold text-dark'>EDIT PRODUCT</label>
                <div className="row px-2">
                  <div className="col-md-8 col-sm-12 p-1">
                    <div className="mb-1">
                      <input type="text" className="form-control rounded-1" name="productName" placeholder='Enter Product Name' value={productName} onChange={(e)=>setProductName(e.target.value)} required/>
                    </div>
                    <div className="mb-1">
                      <input type="text" className="form-control rounded-1" name="productDesc" placeholder='Enter Product Description' value={productDesc} onChange={(e)=>setProductDesc(e.target.value)} required/>
                    </div>
                    <div className="mb-1 d-flex">
                      <input type="text" className="form-control rounded-1 me-1" name="price" placeholder='Enter Product Price' value={price===0?"":price} onChange={(e)=>setPrice(e.target.value)} required/>
                      <input type="text" className="form-control rounded-1" name="stock" placeholder='Enter number of products in the stock' value={stock===0?"":stock} onChange={(e)=>setStock(e.target.value)} required/>
                    </div>
                    <div className="mb-1 d-flex">
                      <select class="form-select rounded-1 me-1" aria-label="Default select example" value={categoryId} onChange={(e)=>setCategoryId(e.target.value)}>
                        <option selected>Choose a category</option>
                        {
                          categories.map((cat) => (
                            <option value={cat.categoryId}>{cat.categoryName}</option>
                          ))
                        }
                      </select>
                      <select class="form-select rounded-1" aria-label="Default select example" value={supplierId} onChange={(e)=>setSupplierId(e.target.value)}>
                        <option selected>Choose a supplier</option>
                        {
                          suppliers.map((sup) => (
                            <option value={sup.supplierId}>{sup.supplierName}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12 py-1 px-0">
                    <img class="mb-1 rounded-1" src={BASE_URL+`/api/v1/products/image/${imageURL}`} alt="" style={{width:"11.2rem", height:"203px"}}/>
                  </div>
                </div>
                <button type="submit" className="custom-btn" style={{width:"100%"}} >Update product</button>
              </form>           
            :
              <form className="shadow bg-light p-5 mx-auto mb-5 rounded-1" style={{maxWidth:"40rem"}} onSubmit={(e)=>handleAddProduct(e,userInfo)}>
                <label className='fs-4 fw-bold text-dark'>ADD PRODUCT</label>
                <div className="row px-2">
                  <div className="col-md-8 col-sm-12 p-1">
                    <div className="mb-1">
                      <input type="text" className="form-control rounded-1" name="productName" placeholder='Enter Product Name' value={productName} onChange={(e)=>setProductName(e.target.value)} required/>
                    </div>
                    <div className="mb-1">
                      <input type="text" className="form-control rounded-1" name="productDesc" placeholder='Enter Product Description' value={productDesc} onChange={(e)=>setProductDesc(e.target.value)} required/>
                    </div>
                    <div className="mb-1 d-flex">
                      <input type="text" className="form-control rounded-1 me-1" name="price" placeholder='Price' value={price===0?"":price} onChange={(e)=>setPrice(e.target.value)} required/>
                      <input type="text" className="form-control rounded-1" name="stock" placeholder='In stock' value={stock===0?"":stock} onChange={(e)=>setStock(e.target.value)} required/>
                    </div>
                    <div className="mb-1 d-flex">
                      <select class="form-select rounded-1 me-1" aria-label="Default select example" value={categoryId} onChange={(e)=>{setCategoryId(e.target.value)}}>
                        <option selected>Choose a category</option>
                        {
                          categories.map((cat) => (
                            <option value={cat.categoryId}>{cat.categoryName}</option>
                          ))
                        }
                      </select>
                      <select class="form-select rounded-1" aria-label="Default select example" value={supplierId} onChange={(e)=>setSupplierId(e.target.value)}>
                        <option selected>Choose a supplier</option>
                        {
                          suppliers.map((sup) => (
                            <option value={sup.supplierId}>{sup.supplierName}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div>
                      <input type="file" className="form-control rounded-1" accept="image/*" required onChange={(e)=>loadImage(e)}/>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12 py-1 px-0">
                    <img id="product-img" class="rounded-1" src={dummyImageURL} alt="" style={{width:"11.2rem", height:"203px"}} />
                  </div>
                </div>
                <button type="submit" className="custom-btn" style={{width:"100%"}}>Add product</button>
              </form>
          }


        <div className="row mx-0 d-flex justify-content-center">
          <div className='mb-1 d-flex justify-content-end'>
            <input type="search" placeholder='🔍Search for products..' className='form-control rounded-1 border p-2 me-3' style={{width: "15rem"}} onChange={(e)=>handleSearch(e.target.value)} autoFocus/>
          </div>
        {
            loading?
              <div className='text-light text-center' disabled>
                  Loading...
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              </div>
            :<>
              {
                products.map((product,index)=>
                  <div className="row rounded-1 shadow bg-light p-0 m-1" style={{width: "38rem"}}>
                    <div className='col-md-4 col-sm-12 p-2'>
                      <img className='rounded-1' src={BASE_URL+`/api/v1/products/image/${product.imageURL}`} alt="" style={{width:"100%",height:"100%"}}/>
                    </div>
                    <div className='col-md-8 col-sm-12 p-3'>
                      <h5>{product.productName}</h5>
                      <p>{product.productDesc}</p>
                      <hr />
                        <label>Product ID: </label><b className='me-2'>ECPD{product.productId}, </b>
                        <label>Price: </label><b className='me-2'>₹ {product.price},</b>
                        <label>In Stock: </label><b className='me-2'>{product.stock}</b>
                      <hr />
                      <div className='d-flex justify-content-end'>
                        <button onClick={(e)=>{
                            setEditing(true)
                            setEditItemId(product.productId)
                            setProductName(product.productName)
                            setProductDesc(product.productDesc)
                            setPrice(product.price)
                            setStock(product.stock)
                            setImageURL(product.imageURL)
                            setCategoryId(product.catId)
                            setSupplierId(product.supId)
                            loadProducts()
                          }
                        } className='custom-btn px-4 me-1'>
                          Edit
                        </button>
                        
                        <button onClick={(e)=>{
                            handleDeleteProduct(product.productId,userInfo)
                          }
                        }
                        className='custom-btn'>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )
              }
              </>
          }
        </div>
      </div>
  )
}

export default ListProducts
