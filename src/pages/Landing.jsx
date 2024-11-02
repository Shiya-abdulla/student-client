import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Landing() {

const [state , setstate ]= useState(false)
    return (
        <>
            <div className='w-100 d-flex justify-content-center align-items-center ' style={{ height: "100vh", backgroundColor: "lightblue" }}>
                <div className='w-75 '>
                    <Row>
                        <Col md={6} sm={12}>
                            <h2>School management</h2>
                            <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus odit distinctio, ipsum quas a, temporibus quidem voluptatum excepturi id architecto veniam beatae dolore molestiae eveniet sed animi, impedit numquam eaque!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem perspiciatis eius impedit vel quos velit sed, doloremque rerum architecto odio aliquid doloribus minima commodi enim vitae aut officiis. Exercitationem, eos?
                            </p>
                            <Link className='btn btn-secondary d-grid' to={'/auth'}>Lets go</Link>
                        </Col>
                        <Col md={6} sm={12} className='p-2'>
                        <img src="https://img.freepik.com/free-vector/futuristic-classroom-little-children-study-with-high-tech-equipment-smart-spaces-school-ai-education-learning-management-system-concept_335657-812.jpg?t=st=1729315935~exp=1729319535~hmac=dbe2d5cf59d76603afcd58e52760663017fdd5f42a809034d17cf2d6214a9f8b&w=740" 
                        className='img-fluid'
                        width={'100%'}
                        alt="" />
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default Landing