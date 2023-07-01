import React,{ useState}  from 'react'
import {addProduct,deleteProduct,updateProduct} from "../services/EcommerceServices"

const ListProducts = ({products, loadProducts, categories, suppliers,loading,setLoading}) => {
  const [productName, setProductName]=useState("")
  const [productDesc, setProductDesc]=useState("")
  const [price, setPrice]=useState(0)
  const [stock, setStock]=useState(0)
  const [imageURL, setImageURL]=useState('')
  const [editing, setEditing]=useState(false)
  const [editItemId,setEditItemId]=useState(0)
  const [categoryId, setCategoryId]=useState(0)
  const [supplierId, setSupplierId]=useState(0)
  const dummyImageURL="https://optinmonster.com/wp-content/uploads/2019/01/cart-abandonment-statistics.png"

  const userInfo=JSON.parse(localStorage.getItem("userInfo"));

  const handleAddProduct=(e,userInfo)=>{
    e.preventDefault()
    const file=e.target.elements[4].files[0]
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
    })
  }

  const handleDeleteProduct=(productId,userInfo)=>{
     deleteProduct(productId,userInfo).then((res)=>{
      loadProducts()
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
            <form className="mx-auto mb-5 border p-3 bg-light" style={{maxWidth:"25rem"}} onSubmit={(e)=>handleUpdateProduct(e,editItemId,userInfo)}>
              <label className='fs-3 fw-bold text-dark'>EDIT PRODUCT</label>
              <hr/>
              <div className="mb-1">
                <input type="text" className="form-control rounded-0" name="productName" placeholder='Enter Product Name' value={productName} onChange={(e)=>setProductName(e.target.value)} required/>
              </div>
              <div className="mb-1">
                <input type="text" className="form-control rounded-0" name="productDesc" placeholder='Enter Product Description' value={productDesc} onChange={(e)=>setProductDesc(e.target.value)} required/>
              </div>
              <div className="mb-1 d-flex">
                <input type="text" className="form-control rounded-0 me-1" name="price" placeholder='Enter Product Price' value={price===0?"":price} onChange={(e)=>setPrice(e.target.value)} required/>
                <input type="text" className="form-control rounded-0" name="stock" placeholder='Enter number of products in the stock' value={stock===0?"":stock} onChange={(e)=>setStock(e.target.value)} required/>
              </div>
              <img class="mb-1 rounded-1" src={`http://localhost:8080/api/v1/products/image/${imageURL}`} alt="" style={{width:"100%"}}/>
              <div className="mb-1 d-flex">
                <select class="form-select rounded-0 me-1" aria-label="Default select example" value={categoryId} onChange={(e)=>setCategoryId(e.target.value)}>
                  <option selected>Choose a category</option>
                  {
                    categories.map((cat) => (
                      <option value={cat.categoryId}>{cat.categoryName}</option>
                    ))
                  }
                </select>

                <select class="form-select rounded-0" aria-label="Default select example" value={supplierId} onChange={(e)=>setSupplierId(e.target.value)}>
                  <option selected>Choose a supplier</option>
                  {
                    suppliers.map((sup) => (
                      <option value={sup.supplierId}>{sup.supplierName}</option>
                    ))
                  }
                </select>
              </div>
              <button type="submit" className="custom-btn" style={{width:"100%"}}>Update Product</button>
            </form>           
          :
            <form className="mx-auto mb-5 border p-3 bg-light" style={{maxWidth:"25rem"}} onSubmit={(e)=>handleAddProduct(e,userInfo)}>
              <label className='fs-3 fw-bold text-dark'>ADD PRODUCT</label>
              <hr/>
              <div className="mb-1">
                <input type="text" className="form-control rounded-0" name="productName" placeholder='Enter Product Name' value={productName} onChange={(e)=>setProductName(e.target.value)} required/>
              </div>
              <div className="mb-1">
                <input type="text" className="form-control rounded-0" name="productDesc" placeholder='Enter Product Description' value={productDesc} onChange={(e)=>setProductDesc(e.target.value)} required/>
              </div>
              <div className="mb-1 d-flex">
                <input type="text" className="form-control rounded-0 me-1" name="price" placeholder='Price' value={price===0?"":price} onChange={(e)=>setPrice(e.target.value)} required/>
                <input type="text" className="form-control rounded-0" name="stock" placeholder='In stock' value={stock===0?"":stock} onChange={(e)=>setStock(e.target.value)} required/>
              </div>
              <img id="product-img" class="mb-1 rounded-1" src={dummyImageURL} alt="" style={{width:"100%"}} />
              <div className="mb-1">
                <input type="file" className="form-control rounded-0" accept="image/*" required onChange={(e)=>loadImage(e)}/>
              </div>
              <div className="mb-1 d-flex">
                <select class="form-select rounded-0 me-1" aria-label="Default select example" value={categoryId} onChange={(e)=>{setCategoryId(e.target.value)}}>
                  <option selected>Choose a category</option>
                  {
                    categories.map((cat) => (
                      <option value={cat.categoryId}>{cat.categoryName}</option>
                    ))
                  }
                </select>

                <select class="form-select rounded-0" aria-label="Default select example" value={supplierId} onChange={(e)=>setSupplierId(e.target.value)}>
                  <option selected>Choose a supplier</option>
                  {
                    suppliers.map((sup) => (
                      <option value={sup.supplierId}>{sup.supplierName}</option>
                    ))
                  }
                </select>
              </div>
              <button type="submit" className="custom-btn">Add Product</button>
            </form>
        }

        <div className="row mx-0">
            <table className='table table-hover border' >
                <thead>
                    <tr className='bg-light'>
                        <th className="fs-6 fw-bold">Product ID</th>
                        <th className="fs-6 fw-bold">Name</th>
                        <th className="fs-6 fw-bold">Description</th>
                        <th className="fs-6 fw-bold">Price</th>
                        <th className="fs-6 fw-bold">In Stock</th>
                        <th className="fs-6 fw-bold">Image</th>
                        <th className="fs-6 fw-bold">Supplier</th>
                        <th className="fs-6 fw-bold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    loading?
                    <tr>
                      <td colSpan={8} className='text-center' disabled>
                          Loading...
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      </td>
                    </tr>
                    :<>
                      {
                      products.map((product,index)=>
                      <tr key={product.productId}>
                          <th className="fs-6 fw-light">ECPD{product.productId}</th>
                          <th className="fs-6 fw-light">{product.productName}</th>
                          <th className="fs-6 fw-light">{product.productDesc}</th>
                          <th className="fs-6 fw-light">{product.price} ₹</th>
                          <th className="fs-6 fw-light">{product.stock}</th>
                          <th className="fs-6 fw-light"><img src={`http://localhost:8080/api/v1/products/image/${product.imageURL}`} alt="" style={{width:"3rem",height:"3rem"}}/></th>
                          <th className="fs-6 fw-light">{product.supplier.supplierName}</th>
                          <th className='d-flex'>
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
                            } className='btn btn-primary btn-sm fw-bold rounded-0 me-1 my-2'>Edit</button>
                            
                            <button onClick={(e)=>{
                              handleDeleteProduct(product.productId,userInfo)
                            }
                          } className='btn btn-danger btn-sm fw-bold rounded-0 my-2'>Delete</button>
                          </th>
                      </tr>
                      )
                    }
                    </>
                  }
                </tbody>
            </table>
        </div>
      </div>
  )
}

export default ListProducts
