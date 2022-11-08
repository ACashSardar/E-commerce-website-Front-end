import React,{ useState}  from 'react'
import {addSupplier,deleteSupplier,updateSupplier} from "../services/EcommerceServices"

const ListSuppliers = ({suppliers,loadSuppliers }) => {
    const [supplierName, setSupplierName] = useState("")
    const [supplierAddress, setSupplierAddress] = useState("")
    const [edting, setEditing]=useState(false)
    const [editItemId,setEditItemId]=useState(0)
  
    const userInfo=JSON.parse(localStorage.getItem("userInfo"));

    const handleAddSupplier=(e,userInfo)=>{
      e.preventDefault()
      console.log(e.target.elements);
      const supplierName=e.target.elements.supplierName.defaultValue
      const supplierAddress=e.target.elements.supplierAddress.defaultValue
  
      const data={"supplierName":supplierName,"supplierAddress":supplierAddress}
  
      addSupplier(data,userInfo).then((res)=>{
        setSupplierAddress('')
        setSupplierName('')
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
      const supplierAddress=e.target.elements.supplierAddress.defaultValue
      const data={"supplierName":supplierName,"supplierAddress":supplierAddress}
      updateSupplier(data,supplierId,userInfo).then((res)=>{
        setSupplierAddress('')
        setSupplierName('')
        setEditItemId(0)
        setEditing(false)
        loadSuppliers()
      })
      
    }
  
  return (
    <div>
        <div className="container-fluid" style={{maxWidth:"50rem"}}>
            { edting ? 
                <form className="mx-auto mb-5 border p-3 mt-5 rounded shadow" style={{maxWidth:"25rem"}} onSubmit={(e)=>handleUpdateSupplier(e,editItemId,userInfo)}>
                <p className='text-center text-primary fw-bold fs-3'>Edit Supplier</p><hr/>
                <div className="mb-3">
                    <input type="text" className="form-control" name="supplierName" placeholder='Enter Supplier Name' value={supplierName} onChange={(e)=>setSupplierName(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" name="supplierAddress" placeholder='Enter Supplier Address' value={supplierAddress} onChange={(e)=>setSupplierAddress(e.target.value)} required/>
                </div>
                <button type="submit" className="btn btn-primary" style={{width:"100%"}}>Update Supplier</button>
                </form>           
            :
                <form className="mx-auto mb-5 border p-3 mt-5 rounded shadow" style={{maxWidth:"25rem"}} onSubmit={(e)=>handleAddSupplier(e,userInfo)}>
                <p className='text-center text-success fw-bold fs-3'>Add a Supplier</p><hr/>
                <div className="mb-3">
                    <input type="text" className="form-control" name="supplierName" placeholder='Enter Supplier Name' value={supplierName} onChange={(e)=>setSupplierName(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" name="supplierAddress" placeholder='Enter Supplier Address' value={supplierAddress} onChange={(e)=>setSupplierAddress(e.target.value)} required/>
                </div>
                <button type="submit" className="btn btn-success" style={{width:"100%"}}>Add Supplier</button>
                </form>
            }


            <p className='text-center text-dark fw-bold fs-3'>List of suppliers</p>
            <div className="row">
                <table className='table table-striped border shadow'>
                    <thead>
                        <tr>
                            <th className="fs-4 fw-normal">Supplier Name</th>
                            <th className="fs-4 fw-normal">Address</th>
                            <th className="fs-4 fw-normal">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            suppliers.map((supplier,index)=>

                            <tr key={supplier.supplierId}>
                                <th className="fs-6 fw-light">{(index+1)+". "+supplier.supplierName}</th>
                                <th className="fs-6 fw-light">{supplier.supplierAddress}</th>
                                <th>
                                <button onClick={(e)=>{
                                    setEditing(true)
                                    setEditItemId(supplier.supplierId)
                                    setSupplierName(supplier.supplierName)
                                    setSupplierAddress(supplier.supplierAddress)
                                    loadSuppliers()
                                    }
                                } className='btn btn-primary btn-sm me-1'>Edit</button>
                                

                                <button onClick={(e)=>{
                                    handleDeleteSupplier(supplier.supplierId,userInfo)
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

export default ListSuppliers
