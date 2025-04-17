import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


function Update() {
    var { id } = useParams();
    var navigate = useNavigate()
    var[state,setState]=useState({
        name:"",
        password:"",
        phno:"",
        _id:""
    })
    
    useEffect(()=>{
        axios.get(`https://login-s7g3.onrender.com/getoneuser/${id}`).then((res)=>{
            console.log(res.data.message)
            setState(res.data.message)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    const updateuser =()=>{
        axios.put("http://localhost:9191/updateuser",state).then((res)=>{
            console.log(res)
            navigate("/home")
        }).catch((err)=>{
            console.log("err",err)
        })
    }
  return (
    <div>
      <div>
        <div className=" form">
          <h1>Update</h1>
          <label>UserName :</label>
          <br></br>
          <input
            value={state.name}
            onChange={(e) => {
              setState({
                ...state,
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
            value={state.password}
            onChange={(e) => {
              setState({
                ...state,
                password: e.target.value,
              });
            }}
            className="in"
            type="password"
            placeholder="Enter Your Password..."
          />
          <br></br>
          <label>Phone No:</label>
          <br></br>
          <input
            value={state.phno}
            onChange={(e) => {
              setState({
                ...state,
                phno: e.target.value,
              });
            }}
            className="in"
            type="number"
            placeholder="Enter Your phone no..."
          />
          <br></br>
          <button className=" b1" onClick={()=>{
            updateuser()
          }}>Update</button>
        </div>
      </div>
    </div>
  );
}

export default Update
