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
    <div>
      <div className="container-fluid" style={{maxWidth:"50rem"}}>
        { edting ? 
            <form className="mx-auto mb-5 border p-3 mt-5 rounded shadow" style={{maxWidth:"25rem"}} onSubmit={(e)=>handleUpdateCategory(e,editItemId,userInfo)}>
              <p className='text-center text-primary fw-bold fs-3'>Edit Category</p><hr/>
              <div className="mb-3">
                <input type="text" className="form-control" name="categoryName" placeholder='Enter Category Name' value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} required/>
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" name="categoryDesc" placeholder='Enter Category Description' value={categoryDesc} onChange={(e)=>setCategoryDesc(e.target.value)} required/>
              </div>
              <button type="submit" className="btn btn-primary" style={{width:"100%"}}>Update Category</button>
            </form>           
          :
            <form className="mx-auto mb-5 border p-3 mt-5 rounded shadow" style={{maxWidth:"25rem"}} onSubmit={(e)=>handleAddCategory(e,userInfo)}>
              <p className='text-center text-success fw-bold fs-3'>Add a Category</p><hr/>
              <div className="mb-3">
                <input type="text" className="form-control" name="categoryName" placeholder='Enter Category Name' value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} required/>
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" name="categoryDesc" placeholder='Enter Category Description' value={categoryDesc} onChange={(e)=>setCategoryDesc(e.target.value)} required/>
              </div>
              <button type="submit" className="btn btn-success" style={{width:"100%"}}>Add Category</button>
            </form>
        }

        <p className='text-center text-dark fw-bold fs-3'>List of Categories</p>
        <div className="row">
            <table className='table table-striped border shadow'>
                <thead>
                    <tr>
                        <th className="fs-4 fw-normal">Category Name</th>
                        <th className="fs-4 fw-normal">Description</th>
                        <th className="fs-4 fw-normal">Actions</th>
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
                              } className='btn btn-primary btn-sm me-1'>Edit</button>
                              

                              <button onClick={(e)=>{
                                handleDeleteCategory(category.categoryId,userInfo)
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

export default ListCategories
