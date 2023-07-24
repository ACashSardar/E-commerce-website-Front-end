import React,{ useState}  from 'react'
import {addCategory,deleteCategory,updateCategory} from "../services/EcommerceServices"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast("Category added successfully.");
    })
  }

  const handleDeleteCategory=(categoryId,userInfo)=>{
    deleteCategory(categoryId,userInfo).then((res)=>{
      loadCategories()
      toast("Category deleted successfully.");
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
      toast("Category updated successfully.");
    })
    
  }

  return (
    <div className="bg-canvas p-5">
      { edting ? 
          <form className="mx-auto mb-5 p-4 shadow bg-light rounded-1" style={{maxWidth:"25rem"}} onSubmit={(e)=>handleUpdateCategory(e,editItemId,userInfo)}>
            <label className='fs-4 fw-bold text-dark mb-2'>EDIT CATEGORY</label>
            <div className="mb-1">
              <input type="text" className="form-control rounded-1" name="categoryName" placeholder='Enter Category Name' value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} required/>
            </div>
            <div className="mb-1">
              <input type="text" className="form-control rounded-1" name="categoryDesc" placeholder='Enter Category Description' value={categoryDesc} onChange={(e)=>setCategoryDesc(e.target.value)} required/>
            </div>
            <button type="submit" className="btn btn-primary rounded-1 p-2" style={{width:"100%"}}>Update Category</button>
          </form>           
        :
          <form className="mx-auto mb-5 p-4 shadow bg-light rounded-1" style={{maxWidth:"25rem"}} onSubmit={(e)=>handleAddCategory(e,userInfo)}>
            <label className='fs-4 fw-bold text-dark mb-2'>ADD CATEGORY</label>
            <div className="mb-1">
              <input type="text" className="form-control rounded-1" name="categoryName" placeholder='Enter Category Name' value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} required/>
            </div>
            <div className="mb-1">
              <input type="text" className="form-control rounded-1" name="categoryDesc" placeholder='Enter Category Description' value={categoryDesc} onChange={(e)=>setCategoryDesc(e.target.value)} required/>
            </div>
            <button type="submit" className="btn btn-primary rounded-1 p-2" style={{width:"100%"}}>Add Category</button>
          </form>
      }

      <div className="row mx-0">
          <table className='table bg-light'>
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
                            } className='btn btn-primary rounded-1 me-1'>Edit</button>

                            <button onClick={(e)=>{
                              handleDeleteCategory(category.categoryId,userInfo)
                            }
                          } className='btn btn-danger rounded-1'>Delete</button>
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
