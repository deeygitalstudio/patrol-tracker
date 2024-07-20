import React, { useState } from 'react'
import image from '/rr.svg'
import './Home.css'
import { Link, useNavigate } from 'react-router-dom';


const Home = ({setShowLogin}) => {
  return (
    <section className='--section'>
    <div className='container'>
    <div className="row --align-center">
    <div className="col-md-4  --flex-dir-column title">
      <h1 className='--fw-bold'>Document your patrol with ease</h1>
      <p>This form is to capture the records of zonal assistant patrols especially their locations where they discharge their duties of visiting locations and maintaining Halogen standards amongst Halogen Operatives.</p>
  <button onClick={() => setShowLogin(true)} className="btn  btt" style={{ backgroundColor: '#17265D', color: '#fff' }}>Get Started</button>
    </div>
    <div className="col-md-8">
      <img src={image} alt="" />
      
    </div>
    
    
    </div>
    <button className="--btn  bts" style={{ backgroundColor: '#17265D', color: '#fff' }}>Get Started</button>  
     
    </div>
    </section>
  )
}

export default Home