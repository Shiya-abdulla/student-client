import React, { useState } from 'react'
import { createContext } from 'react'

export const addResponceContext=createContext()
export const updateStudentContext=createContext()

function Context({children}) {

    const [ addResponce , setAddresponce]=useState("")
    const [updateStudent , setUpdateStudent] = useState('')

  return (
    <>
    <addResponceContext.Provider value={{addResponce , setAddresponce}}>
      <updateStudentContext.Provider value={{updateStudent , setUpdateStudent}}>
        {children}
        </updateStudentContext.Provider>
    </addResponceContext.Provider>
    </>
  )
}

export default Context