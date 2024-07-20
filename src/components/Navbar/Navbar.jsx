import React, { useEffect, useState } from 'react'
import logo from '/logooo.png'
import './navbar.css'
import firebase from "../../firebase";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import logout_icon from '/logout_icon.png'
import profile_icon from '/profile_icon.png'
import cross from '/cross_icon.png'
 import { toast } from 'react-toastify'; 




const Navbar = ({setShowLogin}) => {
const [userName, setUserName] = useState(null);
  const auth = getAuth(firebase);
 const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async (userId) => {
      const db = getDatabase(firebase);
      const userRef = ref(db, 'users/' + userId);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        setUserName(userData.name);
      } else {
        console.log('No data available');
      }
    };

    let unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid);
      } else {
        setUserName(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);


const handleSignOut = () => {
    const auth = getAuth(); // Get the authentication instance
    signOut(auth)
      .then(() => {
         toast.success('User Signed out successfully');
        // Sign-out successful.
           navigate('/')
      })
      .catch((error) => {
        // An error occurred during sign-out.
        console.error(error);
      });
  };




  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link to='/'><a className="navbar-brand" href="#"><img src={logo} alt="" /></a></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav ms-auto">
        
        {!userName ? <a className="nav-link active" onClick={() => setShowLogin(true)} aria-current="page" href="#">Sign in</a>  
    : <div className="navbar-profile">
       <img src={profile_icon} className='--pointer' alt=""/>
       <ul className="nav-profile-dropdown">
       <li className=""><a className="nav-link" href="#">{userName}</a></li>
       <hr />
      <li onClick={handleSignOut}>Logout</li>
      
       </ul>
    </div>
  
  }
     
    </div>
  </div>
  </div>
   
 
</nav>
  )
}

export default Navbar