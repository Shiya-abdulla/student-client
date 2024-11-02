import { useState } from 'react'
import './App.css'
import './bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
     <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/auth' element={<Auth/>} />
      <Route path='/dash' element={<Dashboard/>} />
     </Routes>
     <ToastContainer/>
    </>
  )
}

export default App
