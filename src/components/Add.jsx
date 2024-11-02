import React, { useEffect  , useContext} from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import { addstudentApi } from '../../services/allapi';
import { toast } from 'react-toastify';
import base_url from '../../services/base_url';
import { addResponceContext } from '../contextapi/Context';

function Add() {

  const [student , setStudent] = useState({
    name:"" , batch:"" , phone:""  , image:""
  })

  const [preview , setPreview ]= useState("")

  const {addResponce , setAddresponce} =useContext(addResponceContext) 


  const handleAddStudent=async()=>{
    console.log(student)
    const {name,phone,batch,image}=student
    if(!name || !phone || !batch || !image){
        console.log("Name:", name, "Batch:", batch, "Phone:", phone, "Image:", image);
        toast.warning("Enter Valid Inputs")
    }
    else{
        const fd=new FormData()
        fd.append("name",name)
        fd.append("batch",batch)
        fd.append("phone",phone)
        fd.append("image",image)

        const header={
            "Content-Type":'multipart/form-data',
            "Authorization":`Token ${sessionStorage.getItem('token')}`
        }

        const res=await addstudentApi(fd,header)
        console.log(res)
        if(res.status==200){
            toast.success("Student Added")
            setPreview('')
            handleClose()
            setAddresponce(res)
        }
        else{
            toast.error("Adding Failed!!")
        }


    }

}
  

  useEffect(()=>{
    if(student.image){
      setPreview(URL.createObjectURL(student.image))
    }else{
      setPreview("")
    }
  } , [student.image])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
   <>
   <div className='m-3 d-flex justify-content-center align-items-center'>
          <button className=' btn btn-primary p-3' onClick={handleShow}>Add Student</button>
        </div>

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        // className='modal-xl'
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col md={6} sm={12} >
                <label >
                    <input type="file" style={{visibility:"hidden"}}  onChange={(e)=>setStudent({...student,image:e.target.files[0]})} />
                    <img src={preview?preview:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLNNZWWtN0y8J7VpcqKU-s2MXVWLabnVtfgA&s" }
                    className='img-fluid'
                   
                    alt="" />
                </label>
                </Col>
                <Col md={6} sm={12}  >
          <input type="text" onChange={(e)=>setStudent({...student,name:e.target.value})} className='form-control mb-3' name='name' placeholder='Enter Name' />
          <input type="text" onChange={(e)=>setStudent({...student,batch:e.target.value})}  className='form-control mb-3' name='dt' placeholder='Batch' />
          <input type="number" onChange={(e)=>setStudent({...student,phone:e.target.value})}  className='form-control mb-3' name='phone' placeholder='Enter Phone Number' />
          </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddStudent}>Add</Button>
        </Modal.Footer>
      </Modal>

      
   </>
  )
}

export default Add