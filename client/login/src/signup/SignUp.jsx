import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const navigate = useNavigate();
  var [state, setState] = useState({
    name: "",
    password: "",
    phno: "",
  });
  var sendData = () => {
    axios
      .post("http://localhost:9191/newuser", state)
      .then((res) => {
        if (res.data.status === false) {
          alert("User alredy Existed");
          console.log(res.data);
        }
        else if(res.data.result ==="Used phoneno"){
          alert("This phone no alredy use some other user, change the number");
        }
        else if (res.data.status === true) {
          alert("User Registered");
          console.log(res.data);
          navigate("/");
        }

       
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div>
      <div className=" form">
        <h1>SignUp</h1>
        <label>UserName :</label>
        <br></br>
        <input
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
        <button onClick={sendData} className=" b1">
          Submit
        </button>
        <div className="fp">
          <Link to="/loginpage">Existing user?Login</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;





