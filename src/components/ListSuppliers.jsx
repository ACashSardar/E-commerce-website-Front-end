import React,{ useState}  from 'react'
import {addSupplier,deleteSupplier,updateSupplier} from "../services/EcommerceServices"

const ListSuppliers = ({suppliers,loadSuppliers }) => {
    const [supplierName, setSupplierName] = useState("")
    const [supplierAddress, setSupplierAddress] = useState("")
    const [description, setDescription] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [edting, setEditing]=useState(false)
    const [editItemId,setEditItemId]=useState(0)
  
    const userInfo=JSON.parse(localStorage.getItem("userInfo"));

    const handleAddSupplier=(e,userInfo)=>{
      e.preventDefault()
      console.log(e.target.elements);
      const supplierName=e.target.elements.supplierName.defaultValue
      const description=e.target.elements.description.defaultValue
      const phoneNo=e.target.elements.phoneNo.defaultValue
      const supplierAddress=e.target.elements.supplierAddress.defaultValue

      const data=
      {
        "supplierName":supplierName,
        "description":description,
        "phoneNo":phoneNo,
        "supplierAddress":supplierAddress
      }
  
      addSupplier(data,userInfo).then((res)=>{
        setSupplierName('')
        setDescription('')
        setSupplierAddress('')
        setPhoneNo('')
        loadSuppliers()
      })
    }
  
    const handleDeleteSupplier=(supplierId,userInfo)=>{
      deleteSupplier(supplierId,userInfo).then((res)=>{
        loadSuppliers()
      })
    }
  
    const handleUpdateSupplier=(e,supplierId,userInfo)=>{
      e.preventDefault()

      const supplierName=e.target.elements.supplierName.defaultValue
      const description=e.target.elements.description.defaultValue
      const phoneNo=e.target.elements.phoneNo.defaultValue
      const supplierAddress=e.target.elements.supplierAddress.defaultValue

      const data=
      {
        "supplierName":supplierName,
        "description":description,
        "phoneNo":phoneNo,
        "supplierAddress":supplierAddress
      }

      updateSupplier(data,supplierId,userInfo).then((res)=>{
        setSupplierName('')
        setDescription('')
        setSupplierAddress('')
        setPhoneNo('')
        setEditItemId(0)
        setEditing(false)
        loadSuppliers()
      })
      
    }
  
  return (
    <div>
        <div className="bg-canvas p-5">
            { edting ? 
                <form className="mx-auto mb-5 border p-3 bg-light" style={{maxWidth:"25rem"}} onSubmit={(e)=>handleUpdateSupplier(e,editItemId,userInfo)}>
                  <label className='fs-3 fw-bold text-dark'>EDIT SUPPLIER</label>
                  <hr/>
                  <div className="mb-1">
                      <input type="text" className="form-control rounded-0" name="supplierName" placeholder='Enter Supplier Name' value={supplierName} onChange={(e)=>setSupplierName(e.target.value)} required/>
                  </div>
                  <div className="mb-1">
                      <input type="text" className="form-control rounded-0" name="phoneNo" placeholder='Enter Supplier Phone Number' value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)} required/>
                  </div>
                  <div className="mb-1">
                      <input type="text" className="form-control rounded-0" name="description" placeholder='Enter Supplier Description' value={description} onChange={(e)=>setDescription(e.target.value)} required/>
                  </div>
                  <div className="mb-1">
                      <input type="text" className="form-control rounded-0" name="supplierAddress" placeholder='Enter Supplier Address' value={supplierAddress} onChange={(e)=>setSupplierAddress(e.target.value)} required/>
                  </div>
                  <button type="submit" className="custom-btn" style={{width:"100%"}}>Update Supplier</button>
                </form>           
            :
                <form className="mx-auto mb-5 border p-3 bg-light" style={{maxWidth:"25rem"}} onSubmit={(e)=>handleAddSupplier(e,userInfo)}>
                  <label className='fs-3 fw-bold text-dark'>ADD SUPPLIER</label>
                  <hr/>
                  <div className="mb-1">
                      <input type="text" className="form-control rounded-0" name="supplierName" placeholder='Enter Supplier Name' value={supplierName} onChange={(e)=>setSupplierName(e.target.value)} required/>
                  </div>
                  <div className="mb-1">
                      <input type="text" className="form-control rounded-0" name="phoneNo" placeholder='Enter Supplier Phone Number' value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)} required/>
                  </div>
                  <div className="mb-1">
                      <input type="text" className="form-control rounded-0" name="description" placeholder='Enter Supplier Description' value={description} onChange={(e)=>setDescription(e.target.value)} required/>
                  </div>
                  <div className="mb-1">
                      <input type="text" className="form-control rounded-0" name="supplierAddress" placeholder='Enter Supplier Address' value={supplierAddress} onChange={(e)=>setSupplierAddress(e.target.value)} required/>
                  </div>
                  <button type="submit" className="custom-btn" style={{width:"100%"}}>Add Supplier</button>
                </form>
            }

            <div className="row mx-0">
                <table className='table table-hover border'>
                    <thead>
                        <tr className='bg-light'>
                            <th className="fs-6 fw-bold">Supplier Name</th>
                            <th className="fs-6 fw-bold">Phone Number</th>
                            <th className="fs-6 fw-bold">Description</th>
                            <th className="fs-6 fw-bold">Address</th>
                            <th className="fs-6 fw-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            suppliers.map((supplier,index)=>

                            <tr key={supplier.supplierId}>
                                <th className="fs-6 fw-light">{(index+1)+". "+supplier.supplierName}</th>
                                <th className="fs-6 fw-light">{supplier.phoneNo}</th>
                                <th className="fs-6 fw-light">{supplier.description}</th>
                                <th className="fs-6 fw-light">{supplier.supplierAddress}</th>
                                <th>
                                <button onClick={(e)=>{
                                    setEditing(true)
                                    setEditItemId(supplier.supplierId)
                                    setSupplierName(supplier.supplierName)
                                    setSupplierAddress(supplier.supplierAddress)
                                    setPhoneNo(supplier.phoneNo)
                                    setDescription(supplier.description)
                                    loadSuppliers()
                                    }
                                } className='btn btn-primary btn-sm fw-bold rounded-0 me-1'>Edit</button>
                                

                                <button onClick={(e)=>{
                                    handleDeleteSupplier(supplier.supplierId,userInfo)
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
    </div>
  )
}

export default ListSuppliers
