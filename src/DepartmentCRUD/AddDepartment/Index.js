import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function Index() {
  const[name,setName]=useState("");
  const[capacity,setCapacity]=useState("");
  const navigate=useNavigate();
  const navigateToLogin=()=>{
    navigate(`/`);
  }
  const submit=(e)=>{
    e.preventDefault();
    let dept={
      name:name,
      capacity:capacity
    };
    console.log(JSON.stringify(dept));
    let jwt=null;
    jwt=localStorage.getItem('authenticate');
    jwt="Bearer "+jwt;
    console.log(jwt);
    const config = {
      headers:{
        'Authorization':jwt
      }
    };
    axios.post("http://localhost:8082/api/department/add",dept,config).
    then(res=>{console.log(res);
    setName("");
    setCapacity("");
    alert("Department added successfully");})
    .catch(error=>{
      console.log(error.response.status);
      navigateToLogin();
    });
  }
  return (
    <div className='container'>
        <form onSubmit={submit}>
        <div className="form-group">
            <label htmlFor="Name">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter name" value={name} onChange={(e)=>{setName(e.target.value)}} required/>
        </div>
        <div className="form-group">
            <label htmlFor="Capacity">Capacity</label>
            <input type="number" className="form-control" id="capacity" placeholder="Enter capacity" min="1" max="100" value={capacity} onChange={(e)=>{setCapacity(e.target.value)}} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

