import React, { useState  } from 'react'
import { Row , Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { userRegister , LoginApi } from '../../services/allapi'
import { useNavigate } from 'react-router-dom'

function Auth() {

    const [user , setUser ]= useState({
        email:"" , username :"" ,password:""
    })

    const [state , setstate ] = useState(false)

    const  nav=useNavigate()

    const changestate=()=>{
        setstate(!state)
    }

    const handleRegister=async()=>{
        console.log(user)
        const {email , username , password}=user
        if(!email || !username || !password){
            toast.warning("Invalid inputs")
        }else{
            const res= await userRegister(user)
            console.log(res)
            if(res.status==200){
                toast.success("Registered successfully")
                changestate()
                setUser({
                    email:"" , password:"" , username:""
                })
            }else{
                toast.error("Registration failed")
            }
        }
    }

    const handleLogin=async()=>{
        const {email , password }= user
        if(!email|| !password){
            toast.warning("Enter valid inputs")
        }
        else{
            const res= await LoginApi({email , password})
            if(res.status==200){
                console.log(res)
                sessionStorage.setItem("token",res.data.token )
                sessionStorage.setItem("username" , res.data.username)
                toast.success("Login successfully")
                setUser({
                    email:"" , password:"" , username:""
                })
                nav('/dash')
            }else{
                toast.error("Login failed")
            }
        }
    }
    
  return (
   <>
   <div className='d-flex justify-content-center align-items-center '>
    <div className='border border shadow border-3 p-5 w-75 mt-5' >
        <Row>
            <Col sm={12} md={6}>
            {
                state ?
                <h2 className='text-center mb-5'>Registration</h2>
                :
                <h2 className='text-center mb-5'>Login</h2>

            }
         
            <input type="text" className='form-control mb-3' value={user.email} placeholder='Email ID' onChange={(e)=>setUser({...user , email:e.target.value})} />
            {
                state &&
                <input type="text" className='form-control mb-3' value={user.username} onChange={(e)=>setUser({...user , username:e.target.value})} placeholder='Username'  />

            }
        <input type="text" className='form-control mb-3' value={user.password} onChange={(e)=>setUser({...user , password:e.target.value})} placeholder='Password'  />
        {
            state ?
            <div className='d-grid'
        ><button className='btn btn-primary' onClick={handleRegister}>Register</button>
        </div> 
        :
        <div className='d-grid'
        ><button className='btn btn-primary' onClick={handleLogin}>Login</button>
        </div> 
        }
        
        {
            state ?
            <button className='btn btn-link' onClick={changestate}>Already have an account? </button>
            :
            <button className='btn btn-link' onClick={changestate}>New User? </button>

        }
     

            </Col>
            <Col sm={12} md={6}>
            <img src="https://img.freepik.com/premium-photo/sign-login-website-page_406811-99939.jpg?w=740" 
            className='img-fluid'
            height={'100%'}
            alt="" />
            </Col>
        </Row>
        
    </div>
   </div>
   </>
  )
}

export default Auth