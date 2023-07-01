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
    <div className="bg-canvas p-5">
      { edting ? 
          <form className="mx-auto mb-5 border p-3 bg-light" style={{maxWidth:"25rem"}} onSubmit={(e)=>handleUpdateCategory(e,editItemId,userInfo)}>
            <label className='fs-3 fw-bold text-dark'>EDIT CATEGORY</label>
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
          <form className="mx-auto mb-5 border p-3 bg-light" style={{maxWidth:"25rem"}} onSubmit={(e)=>handleAddCategory(e,userInfo)}>
            <label className='fs-3 fw-bold text-dark'>ADD CATEGORY</label>
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

      <div className="row mx-0">
          <table className='table table-hover border'>
              <thead>
                  <tr className='bg-light'>
                      <th className="fs-6 fw-bold">Category Name</th>
                      <th className="fs-6 fw-bold">Description</th>
                      <th className="fs-6 fw-bold">Actions</th>
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
                            } className='btn btn-primary btn-sm fw-bold rounded-0 me-1'>Edit</button>

                            <button onClick={(e)=>{
                              handleDeleteCategory(category.categoryId,userInfo)
                            }
                          } className='btn btn-danger btn-sm fw-bold rounded-0'>Delete</button>
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
