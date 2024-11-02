import base_url from "./base_url";
import commonapi from "./commonapi";

export const userRegister=async(data)=>{
    return await commonapi(`${base_url}/reg`, "POST" , "" ,data)
}

export const LoginApi=async(data)=>{
    return await commonapi(`${base_url}/log`, "POST" , "" ,data)
}

export const addstudentApi=async(data , header)=>{
    return await commonapi(`${base_url}/addstudent`, "POST" , header ,data)
}

export const getStudentApi=async( header , search)=>{
    return await commonapi(`${base_url}/getstudent?search=${search}`, "GET" , header ,"")
}

export const deleteStudentApi=async(id , header)=>{
    return await commonapi(`${base_url}/delstudent/${id}`, "DELETE" , header ,{})
}

export const updateStudentApi=async(id ,data , header)=>{
    return await commonapi(`${base_url}/updatestudent/${id}`, "PUT" , header ,data)
}