import React, { useContext } from 'react'
import { useState , useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import base_url from '../../services/base_url';
import { toast } from 'react-toastify';
import { updateStudentApi } from '../../services/allapi';
import { updateStudentContext } from '../contextapi/Context';


function Edit({ student }) {

  const [show, setShow] = useState(false);

  const [detail , setDetail] = useState({...student})

  const [preview , setPreview]= useState("")

  const {updateStudent , setUpdateStudent} =useContext(updateStudentContext)

  useEffect(()=>{
    if(detail.image.type){  // we use type property extra for error solve  - string has no type proppery
      setPreview(URL.createObjectURL(detail.image))
    }
  } , [detail.image])

  const handleEdit=async()=>{
    console.log(detail)
    const {name , batch , image , phone }= detail
    if(!name || !batch || !phone || !image){
      toast.warning("Invalid inputs")
    }else{
      if(image.type){
        const fd= new FormData()
        fd.append('name',name)
        fd.append('batch',batch)
        fd.append('phone',phone)
        fd.append('image',image)

        const header={
          'Content-Type':'multipart/form-data',
          'Authorization':`Token ${sessionStorage.getItem('token')}`
        }

        const res=await updateStudentApi(student._id , fd , header)
        if(res.status==200){
          setUpdateStudent(res)  // its contextapi - use to automatically display the data without refresh
          toast.success("Updated successfully")
          setDetail({...res.data})
          setPreview("")
          handleClose()
        }else{
          toast.error("Updated failed")
        }
      }
      else{
        const header={
          'Content-Type':'application/json',
          'Authorization':`Token ${sessionStorage.getItem('token')}`
        }
        const res=await updateStudentApi(student._id , detail , header)
        if(res.status==200){
          toast.success("Updated successfully")
          handleClose()
          setDetail({...res.data})
          setPreview("")
          setUpdateStudent(res)
        }else{
          toast.error("Updated failed")
        }
      }
    }
  }

  const handleClose = () =>{
    setShow(false)
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <button className='btn' onClick={handleShow}>
        <i className=" ms-3 fa-solid fa-pen" style={{ color: "#000205", }} />
      </button>



      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={5}>
              <label >
                <input type="file" style={{ visibility: "hidden" }} onChange={(e)=>setDetail({...detail , image:e.target.files[0]})} />
                <img src={ preview ? preview :`${base_url}/uploads/${student.image}`}
                  className='img-fluid'
                  alt="" />
              </label>
            </Col>
            <Col md={7}>
              <input type="text" defaultValue={student.name} onChange={(e)=>setDetail({...detail , name:e.target.value})} className='form-control mb-3' name='name' placeholder='Enter Name' />
              <input type="text" defaultValue={student.batch} onChange={(e)=>setDetail({...detail , batch:e.target.value})} className='form-control mb-3' name='class' placeholder='Enter Batch' />
              <input type="number" defaultValue={student.phone} onChange={(e)=>setDetail({...detail , phone:e.target.value})} className='form-control mb-3' name='phone' placeholder='Enter Phone Number' />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>Edit</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit