import React, { useEffect, useState } from 'react'
import cross from '/cross_icon.png'
import "./login.css"
import {useNavigate} from 'react-router-dom'
import firebase from "../../firebase";
import { getAuth, signInWithEmailAndPassword,  createUserWithEmailAndPassword} from "firebase/auth";
import { toast } from 'react-toastify';
import { getDatabase, ref, get, set, onValue, query, orderByChild, equalTo } from 'firebase/database';


const Login = ({setShowLogin}) => {
const [currentState, setCurrentState] = useState('Login')



const [data, setData] = useState({
  name: "",
  email: "",
  password: ""
})

 const navigate = useNavigate();


const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data,[name]:value}))
}



  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const auth = getAuth(firebase); // Initialize Firebase Authentication

      // Create a new use with email and password
      const userCredential =   await createUserWithEmailAndPassword(auth, data.email, data.password); 
     

      // If the user is created successfully, store additional information in Realtime Database
        const user = userCredential.user;
      const db = getDatabase(firebase);

      await set(ref(db, 'users/' + user.uid), {
        name: data.name,
        email: data.email,
        password: data.password,
        createdAt: new Date().toString(),
      });
      // Signup successful), handle any additional actions (e.g., redirect)
     
       navigate('/form');
      toast.success('User created successfully');
      
      
   
    } catch (error) {
      console.error('Error signing up:', error.message);
      toast.error(error.message);
      // Haandle signup error (e.g., show error message to the user)
    }
  };



  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      toast.success('User logged in successfully');
      navigate('/form');
      const db = getDatabase();

      // Check if the user exists in the 'users' node
      const userRef = ref(db, `users/${user.uid}`);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.val();                                                 
        console.log('User data:', userData);

        // Check if user is an admin
        const adminRef = ref(db, 'admins');
        const admin1Snapshot = await get(adminRef);

        

        if (admin1Snapshot.exists() && admin1Snapshot.val().email === user.email && admin1Snapshot.val().isAdmin) {
            const adminData = admin1Snapshot.val();     
           console.log('Admin data:', adminData);
          navigate('/dashboard'); // Redirect to admin page if user is admin1
        } else {
          navigate('/form'); // Redirect to regular user page if not an admin or admin1
        }
      } else {
        console.log('User data not found in database');

        // Handle case where user data doesn't exist (optional)
      }

      setShowLogin(false); // Optionally hide login form after successful login
    } catch (error) {
      toast.error('Login error: ' + error.message);
      console.error('Error signing in:', error);
    }
  };
  


// useEffect(() => {
//  console.log(data);
// }, [data])



  return (
      <div className='login-pop'>
     <form  className='login-cont' onSubmit={currentState === "Login" ? handleLogin : handleSignup}>
     <div className="loginTitle">
      <h2>{currentState}</h2>
      <img onClick={() => setShowLogin(false)} src={cross} alt="" />
     </div>
     <div className="loginInput">

     {currentState === "Login" ? <></> : (
      <>
       <label htmlFor="">Call Sign</label>
       <input type="text" name="name" onChange={onChangeHandler} value={data.name}  placeholder='eg Digital' required/> 
       </>
       )}
     <label htmlFor="">Email</label>
     <input type="email" name='email' onChange={onChangeHandler} value={data.email}  placeholder='your email' required/>
     <label htmlFor="">Password</label>
     <input type="password" name='password' onChange={onChangeHandler} value={data.password}  placeholder='your password' required/>
     </div>
     <button type="submit">{currentState === "Sign Up" ? "Create Account" : "Login"}</button>

     <div className="form-check">
  <input className="form-check-input" required type="checkbox" value="" id="flexCheckDefault" />
  <label className="form-check-label" htmlFor="flexCheckDefault">
    By continuing, i agree to the terms of use and privacy policy
  </label>
</div>
     {currentState === "Sign Up" 
     ?<p className='--text-center'>Already have an account: <span onClick={() =>setCurrentState('Login')}>Login here</span></p>
     :<p className='--text-center'>Create a new account: <span onClick={() =>setCurrentState('Sign Up')}>Click here</span></p> }
     </form>
       
    </div>
  )
}

export default Login
