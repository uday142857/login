import React, { useState } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function Login() {
  var navigate = useNavigate()
  var [user, setUser] = useState({
    name:"",
    password:""
  });

  const login = ()=>{
    axios.post("https://login-s7g3.onrender.com/auth/login",user).then((res)=>{
      if(res.data.ok === true){
         console.log(res.data.token);
         localStorage.setItem("token",res.data.token)
         navigate("/home");
      }
      else if(res.data.result==="Invalid password"){
         alert("password Not match");
         console.log(res.data);
      }
      else{
        alert("Invalid User,pls Enter valid user")
        console.log(res.data);

      }
     
    }).catch((err)=>{
      console.log("err",err)
    });
  }
  return (
    
    <div className=" form">
        <h1>Login</h1>
        <label>UserName :</label>
        <br></br>
        <input
          onChange={(e) => {
            setUser({
              ...user,
              name: e.target.value,
            });
          }}
          className="in"
          type="text"
          placeholder="Enter Your Name..."
        />
        <br></br>
        <label>Password :</label>
        <br></br>
        <input
          onChange={(e) => {
            setUser({
              ...user,
              password: e.target.value,
            });
          }}
          className="in"
          type="password"
          placeholder="Enter Your Password..."
        />
        <br></br>
        <button  className="btn btn-primary b1" onClick={login}>Log In</button>
        <div className='fp'>
            <Link to='/forgotpassword'>Forgot Password?</Link>
            <Link to='/signuppage'>Sign up</Link>
        </div>
      </div>
    
  )
}

export default Login
