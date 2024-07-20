import React, { useState } from 'react'
import './App.css'
import { Route, Routes} from 'react-router-dom'
import FormDatas from './components/Pages/form/FormDatas'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Pages/Home/Home'
import Login from './components/Login-pop/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Pages/Dashboard/Dashboard'
// import ProtectedRoute from './ProtectedRoute';
// import Unauthorized from './components/Pages/Unauthorized/Unauthorized'


function App() {
 const [showLogin, setShowLogin] = useState(false)

  return (
    <>
    <ToastContainer />
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="">
         <Navbar setShowLogin={setShowLogin}  />
    
    <Routes>
    <Route path='/' element={<Home  setShowLogin={setShowLogin} />} />
    <Route path="/dashboard" element={<Dashboard  />} />
     <Route path='/form' element={<FormDatas />} />
    </Routes>
      </div>
   
    </>
  )
}

export default App
