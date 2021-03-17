import {useContext, useState } from 'react';

import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { handleGoogleSignIn, initializeLoginFramework,handleSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManger';



function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    password: '',
    error: '',
    success: false
  });

  initializeLoginFramework();

  const [loggedInUser,setLoggedInUser] = useContext(userContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () =>{
      handleGoogleSignIn()
      .then(res => {
        handleResponse(res,true);
      })
  }

  const signOut = ()=>{
        handleSignOut()
        .then(res => {
            handleResponse(res,false);
        })
  }

  const handleResponse = (res,redirect)=>{
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
        history.replace(from);
    }
  }

 




  const handleBlur = (e) => {
    let isFieldValid = true;

    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name,user.email,user.password)
      .then(res => {
        handleResponse(res,false);
        // history.replace(from);
      })
    }
    if (!newUser && user.email && user.password) {
        signInWithEmailAndPassword(user.email,user.password)
        .then(res => {
            handleResponse(res,true);
          })
    }
    e.preventDefault();
   
  }

  
  return (
    <div style={{textAlign:'center'}}>
      <button onClick={googleSignIn}>signIn With Google</button>
      {
        user.isSignedIn && <div>
          <p> Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt=""></img>
        </div>
      }
      <h1>Our Own Authentication</h1>
      {/* <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p> */}

      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" />
      <label htmlFor="newUser">New user signUp</label>
      <form onSubmit={handleSubmit}>
        {
          newUser && <input type="text" name='name' onBlur={handleBlur} placeholder='your name' required />
        }
        <br />
        <input type="email" name='email' onBlur={handleBlur} placeholder='your email' required />
        <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder="your password" required />
        <br />
        <input type="submit" value={newUser? 'Sign Up' : 'Sign In'} required />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>
      }
    </div>
  );
}

export default Login;
