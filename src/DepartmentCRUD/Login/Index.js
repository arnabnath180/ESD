import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
export default function Index() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  const navigateToDepartment = ()=>{
    navigate(`/Department`);
  } 
  
  const submit=(e)=>{
    e.preventDefault();
    let dept={
      username:email,
      password:password
    };
    axios.post("http://localhost:8082/authenticate",dept).
    then(res=>{
      localStorage.setItem('authenticate',res.data.jwt);
      navigateToDepartment();
    })
    .catch(error=>{
      console.log(error.response.status);
      alert("Bad Credentials");
      setEmail("");
      setPassword("");
    });
  }
  

  return (
    <div className='Login container-fluid'>
        <form onSubmit={submit}>
        <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" value={email}
            onChange={(e)=>setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required></input>
        </div>
        <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" value={password}
            onChange={(e)=>setPassword(e.target.value)} id="exampleInputPassword1" placeholder="Password" required></input>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}
