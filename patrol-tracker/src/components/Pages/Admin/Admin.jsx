import React, { useState } from 'react'
import image from '/ft.jpg'
import './admin.css'
import { Link, useNavigate } from 'react-router-dom';


const Admin = ({setShowLogin}) => {
   return (
    <section className='--section'>
    <div className='container'>
    <div className="row --align-center">
    <div className="col-md-5  --flex-dir-column title">
      <h1 className='--fw-bold'>Manage Patrol Data for Zonal Assistants</h1>
      <p>Monitor patrol data from all zonal assistant Pan Nigeria with just a single click</p>
  <button onClick={() => setShowLogin(true)} className="--btn  btt" style={{ backgroundColor: '#17265D', color: '#fff' }}>Get Started</button>
    </div>
    <div className="col-md-7">
      <img src={image} alt="" />
      
    </div>
    
    
    </div>
    <button className="--btn  bts" style={{ backgroundColor: '#17265D', color: '#fff' }}>Get Started</button>  
     
    </div>
    </section>
  )

}

export default Admin