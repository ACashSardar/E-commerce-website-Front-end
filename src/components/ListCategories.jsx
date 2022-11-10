import React,{ useState}  from 'react'
import {addCategory,deleteCategory,updateCategory} from "../services/EcommerceServices"

const ListCategories = ({categories,loadCategories}) => {
  const [categoryName, setCategoryName] = useState("")
  const [categoryDesc, setCategoryDesc] = useState("")
  const [edting, setEditing]=useState(false)
  const [editItemId,setEditItemId]=useState(0)

  const userInfo=JSON.parse(localStorage.getItem("userInfo"));
  
  const handleAddCategory=(e,userInfo)=>{
    e.preventDefault()
    const categoryName=e.target.elements.categoryName.defaultValue
    const categoryDesc=e.target.elements.categoryDesc.defaultValue

    const data={"categoryName":categoryName,"categoryDesc":categoryDesc}

    addCategory(data,userInfo).then((res)=>{
      setCategoryDesc('')
      setCategoryName('')
      loadCategories()
    })
  }

  const handleDeleteCategory=(categoryId,userInfo)=>{
    deleteCategory(categoryId,userInfo).then((res)=>{
      loadCategories()
    })
  }

  const handleUpdateCategory= (e,categoryId,userInfo)=>{
    e.preventDefault()
    const categoryName=e.target.elements.categoryName.defaultValue
    const categoryDesc=e.target.elements.categoryDesc.defaultValue
    const data={"categoryName":categoryName,"categoryDesc":categoryDesc}
    updateCategory(data,categoryId,userInfo).then((res)=>{
      setCategoryDesc('')
      setCategoryName('')
      setEditItemId(0)
      setEditing(false)
      loadCategories()
    })
    
  }

  return (
    <div className="container-fluid p-0" style={{maxWidth:"85rem"}}>
      { edting ? 
          <form className="mx-auto mb-5 border p-3 mt-5 bg-light" style={{maxWidth:"25rem"}} onSubmit={(e)=>handleUpdateCategory(e,editItemId,userInfo)}>
            <label className='fs-3 fw-normal text-success'>EDIT CATEGORY</label>
            <hr/>
            <div className="mb-1">
              <input type="text" className="form-control rounded-0" name="categoryName" placeholder='Enter Category Name' value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} required/>
            </div>
            <div className="mb-1">
              <input type="text" className="form-control rounded-0" name="categoryDesc" placeholder='Enter Category Description' value={categoryDesc} onChange={(e)=>setCategoryDesc(e.target.value)} required/>
            </div>
            <button type="submit" className="custom-btn" style={{width:"100%"}}>Update Category</button>
          </form>           
        :
          <form className="mx-auto mb-5 border p-3 mt-5 bg-light" style={{maxWidth:"25rem"}} onSubmit={(e)=>handleAddCategory(e,userInfo)}>
            <label className='fs-3 fw-normal text-success'>ADD CATEGORY</label>
            <hr/>
            <div className="mb-1">
              <input type="text" className="form-control rounded-0" name="categoryName" placeholder='Enter Category Name' value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} required/>
            </div>
            <div className="mb-1">
              <input type="text" className="form-control rounded-0" name="categoryDesc" placeholder='Enter Category Description' value={categoryDesc} onChange={(e)=>setCategoryDesc(e.target.value)} required/>
            </div>
            <button type="submit" className="custom-btn" style={{width:"100%"}}>Add Category</button>
          </form>
      }
      <div className='mb-1'>
        <span className='fw-light fs-4 accent1-bg badge rounded-0 mx-auto'><i class="fa fa-shopping-bag"></i> List of Categories :</span>
      </div>
      <div className="row mx-0">
          <table className='table table-hover border'>
              <thead>
                  <tr className='accent1-bg text-light'>
                      <th className="fs-5 fw-light">Category Name</th>
                      <th className="fs-5 fw-light">Description</th>
                      <th className="fs-5 fw-light">Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {
                      categories.map((category,index)=>

                      <tr key={category.categoryId}>
                          <th className="fs-6 fw-light">{(index+1)+". "+category.categoryName}</th>
                          <th className="fs-6 fw-light">{category.categoryDesc}</th>
                          <th>
                            <button onClick={(e)=>{
                                setEditing(true)
                                setEditItemId(category.categoryId)
                                setCategoryName(category.categoryName)
                                setCategoryDesc(category.categoryDesc)
                                loadCategories()
                              }
                            } className='btn btn-primary rounded-0 me-1'>Edit</button>

                            <button onClick={(e)=>{
                              handleDeleteCategory(category.categoryId,userInfo)
                            }
                          } className='btn btn-danger rounded-0'>Delete</button>
                          </th>
                      </tr>
                      )
                  }
              </tbody>
          </table>
      </div>
    </div>
  )
}

export default ListCategories
