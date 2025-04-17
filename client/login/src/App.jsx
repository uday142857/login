import SignUp from './signup/SignUp'
import './App.css'
import Home from './home/Home'
import Login from './login/Login'
import { Route,Routes } from 'react-router-dom'
import Update from './update/Update'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/forgotpassword" element={} /> */}
        <Route path="/signuppage" element={<SignUp />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/loginpage" element={<Login/>} />
        <Route path="/update/:id" element={<Update/>} />
      </Routes>
      
     
    </div>
  );
}

export default App
