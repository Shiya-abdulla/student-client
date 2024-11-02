import React, { useEffect, useState , useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Add from '../components/Add';
import Table from 'react-bootstrap/Table';
import Edit from '../components/Edit';
import { deleteStudentApi, getStudentApi } from '../../services/allapi';
import { addResponceContext , updateStudentContext } from '../contextapi/Context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



function Dashboard() {

  const nav=useNavigate()
  const [student , setStudent]=useState([])
  const [searchKey , setSearchKey] = useState("")
  console.log(searchKey)

  const {addResponce , setAddresponce} =useContext(addResponceContext) 

  const {updateStudent , setUpdateStudent} =useContext(updateStudentContext)



  useEffect(()=>{
    getData()
  },[addResponce , updateStudent , searchKey])

  const getData=async()=>{
    const header={
      "Content-Type":'application/json',
      "Authorization":`Token ${sessionStorage.getItem('token')}`

    }
    const res=await getStudentApi(header , searchKey)
    console.log(res)
    if(res.status==200){
      setStudent(res.data)
    }
  }

  const handleDelete=async(id)=>{
    const header={
      "Content-Type":'application/json',
      "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    const res=await deleteStudentApi(id , header)
    if(res.status==200){
      toast.success("Student detils removed")
      getData()
    }else{
      toast.error("Something went wrong!")
      console.log(res)
    }
  }

  const logout=()=>{
    sessionStorage.clear()
    nav('/auth')
  }

  return (
  <>
 <div>
    <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">
            <h2> <i className="fa-solid fa-school " style={{color: "#094fc8",}} />{' '}
            
                Student Management System
                </h2>
              </Navbar.Brand>
            <button className='btn btn-danger' onClick={logout}>Logout</button>
          </Container>
        </Navbar>

        <div className='d-flex justify-content-between px-4'>
          <Add/>
          <div>
            <input type="text" placeholder='Enter Name To Search' onChange={(e)=>setSearchKey(e.target.value)} className="form-control" />
          </div>
          </div>

        <div className='p-5'>
          {
            student.length>0 ?
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Batch</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                student.map((item , index)=>(
                  <tr>
                  <td>{index+1}</td>
                  <td>{item.name}</td>
                  <td>{item.batch}</td>
                  <td>{item.phone}</td>
                  <td>
                    <Edit student={item}/>
                    <button className='btn' onClick={()=>handleDelete(item._id)} >
                        <i className=" ms-4 fa-solid fa-trash" style={{color: "#e40707",}} />
                        </button>
                  </td>
        
                </tr>
                ))
              }
             
              
            </tbody>
          </Table>
          :
          <h3 className='text-center text-danger'>No student added yet !!</h3>
          }
     
      </div>

        


 </div>
  </>
  )
}

export default Dashboard