import React,{ useState}  from 'react'
import {addProduct,deleteProduct,updateProduct} from "../services/EcommerceServices"

const ListProducts = ({products, loadProducts, categories, suppliers}) => {
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
    <div>
      <div className="container-fluid" style={{maxWidth:"60rem"}}>
        { editing ? 
            <form className="mx-auto mb-5 border p-3 mt-5 rounded shadow" style={{maxWidth:"25rem"}} onSubmit={(e)=>handleUpdateProduct(e,editItemId,userInfo)}>
              <p className='text-center text-primary fw-bold fs-3'>Edit Product</p><hr/>
              <div className="mb-1">
                <input type="text" className="form-control" name="productName" placeholder='Enter Product Name' value={productName} onChange={(e)=>setProductName(e.target.value)} required/>
              </div>
              <div className="mb-1">
                <input type="text" className="form-control" name="productDesc" placeholder='Enter Product Description' value={productDesc} onChange={(e)=>setProductDesc(e.target.value)} required/>
              </div>
              <div className="mb-1 d-flex justify-content-around">
                <span>Product Price</span>
                <span>In stock</span>
              </div>
              <div className="mb-1 d-flex">
                <input type="text" className="form-control me-1" name="price" placeholder='Enter Product Price' value={price} onChange={(e)=>setPrice(e.target.value)} required/>
                <input type="text" className="form-control" name="stock" placeholder='Enter number of products in the stock' value={stock} onChange={(e)=>setStock(e.target.value)} required/>
              </div>
              <img class="mb-1 rounded-1" src={`http://localhost:8080/api/v1/products/image/${imageURL}`} alt="" style={{width:"100%"}}/>
              <div className="mb-1 d-flex">
                <select class="form-select me-1" aria-label="Default select example" value={categoryId} onChange={(e)=>setCategoryId(e.target.value)}>
                  <option selected>Choose a category</option>
                  {
                    categories.map((cat) => (
                      <option value={cat.categoryId}>{cat.categoryName}</option>
                    ))
                  }
                </select>

                <select class="form-select" aria-label="Default select example" value={supplierId} onChange={(e)=>setSupplierId(e.target.value)}>
                  <option selected>Choose a supplier</option>
                  {
                    suppliers.map((sup) => (
                      <option value={sup.supplierId}>{sup.supplierName}</option>
                    ))
                  }
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{width:"100%"}}>Update Product</button>
            </form>           
          :
            <form className="mx-auto mb-5 border p-3 mt-5 rounded shadow" style={{maxWidth:"25rem"}} onSubmit={(e)=>handleAddProduct(e,userInfo)}>
              <p className='text-center text-success fw-bold fs-3'>Add Product</p><hr/>
              <div className="mb-1">
                <input type="text" className="form-control" name="productName" placeholder='Enter Product Name' value={productName} onChange={(e)=>setProductName(e.target.value)} required/>
              </div>
              <div className="mb-1">
                <input type="text" className="form-control" name="productDesc" placeholder='Enter Product Description' value={productDesc} onChange={(e)=>setProductDesc(e.target.value)} required/>
              </div>
              <div className="mb-1 d-flex justify-content-around">
                <span>Product Price</span>
                <span>In stock</span>
              </div>
              <div className="mb-1 d-flex">
                <input type="text" className="form-control me-1" name="price" placeholder='Price' value={price} onChange={(e)=>setPrice(e.target.value)} required/>
                <input type="text" className="form-control" name="stock" placeholder='In stock' value={stock} onChange={(e)=>setStock(e.target.value)} required/>
              </div>
              <img id="product-img" class="mb-1 rounded-1" src={dummyImageURL} alt="" style={{width:"100%"}} />
              <div className="mb-1">
                <input type="file" className="form-control" accept="image/*" required onChange={(e)=>loadImage(e)}/>
              </div>
              <div className="mb-1 d-flex">
                <select class="form-select me-1" aria-label="Default select example" value={categoryId} onChange={(e)=>{setCategoryId(e.target.value)}}>
                  <option selected>Choose a category</option>
                  {
                    categories.map((cat) => (
                      <option value={cat.categoryId}>{cat.categoryName}</option>
                    ))
                  }
                </select>

                <select class="form-select" aria-label="Default select example" value={supplierId} onChange={(e)=>setSupplierId(e.target.value)}>
                  <option selected>Choose a supplier</option>
                  {
                    suppliers.map((sup) => (
                      <option value={sup.supplierId}>{sup.supplierName}</option>
                    ))
                  }
                </select>
              </div>
              <button type="submit" className="btn btn-success" style={{width:"100%"}}>Add Product</button>
            </form>
        }
        <p className='text-center text-dark fw-bold fs-3'>List of Products</p>
        <div className="row">
            <table className='table table-striped border shadow'>
                <thead>
                    <tr>
                        <th className="fs-4 fw-normal">Name</th>
                        <th className="fs-4 fw-normal">Description</th>
                        <th className="fs-4 fw-normal">Price</th>
                        <th className="fs-4 fw-normal">Stock</th>
                        <th className="fs-4 fw-normal">Image</th>
                        <th className="fs-4 fw-normal">Supplier</th>
                        <th className="fs-4 fw-normal">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product,index)=>

                        <tr key={product.productId}>
                            <th className="fs-6 fw-light">{(index+1)+". "+product.productName}</th>
                            <th className="fs-6 fw-light">{product.productDesc}</th>
                            <th className="fs-6 fw-light">{product.price} ₹</th>
                            <th className="fs-6 fw-light">{product.stock}</th>
                            <th className="fs-6 fw-light"><img src={`http://localhost:8080/api/v1/products/image/${product.imageURL}`} alt="" style={{width:"3rem"}}/></th>
                            <th className="fs-6 fw-light">{product.supplier.supplierName}</th>
                            <th>
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
                              } className='btn btn-primary btn-sm me-1'>Edit</button>
                              
                              <button onClick={(e)=>{
                                handleDeleteProduct(product.productId,userInfo)
                              }
                            } className='btn btn-danger btn-sm'>Delete</button>
                            </th>
                        </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
      </div>
    </div>

  )
}

export default ListProducts
