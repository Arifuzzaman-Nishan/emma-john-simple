import {useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


if (!firebase.apps.length)
  firebase.initializeApp(firebaseConfig);


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

  const [loggedInUser,setLoggedInUser] = useContext(userContext);
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };



  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
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
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
        })
        .catch(error => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
        //   console.log('sign in user',res.user);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  }

  const updateUserName = (name) => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function () {
        console.log('user name updated successfully');
    }).catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div style={{textAlign:'center'}}>
      <button onClick={handleSignIn}>signIn With Google</button>
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
