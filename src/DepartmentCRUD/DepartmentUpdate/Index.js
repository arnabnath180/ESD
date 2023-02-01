import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import { useNavigate } from 'react-router-dom';
export default function Index({data,hide}) {
    const[name,setName]=useState("");
    const[capacity,setCapacity]=useState("");
    const [length, setL]=useState(0);
    const navigate=useNavigate();
    const navigateToLogin=()=>{
        navigate(`/`);
    }
      useEffect(()=>{
        let jwt=null;
        jwt=localStorage.getItem('authenticate');
        jwt="Bearer "+jwt;
        console.log(jwt);
        const config = {
          headers:{
            'Authorization':jwt
          }
        };
        axios.get(`http://localhost:8082/api/department/get/${data.i}`,config).
        then(res=>{setL(res.data.emp_list.length);setName(res.data.name);setCapacity(res.data.capacity)})
        .catch(error=>{
          console.log(error.response.status);
          navigateToLogin();
      });
    },[])
    
      const submit=(e)=>{
        e.preventDefault();
        let dept={name:name,capacity:capacity};
        console.log(JSON.stringify(dept));
        if(capacity<length){
          alert("Current number of employee is ",length," which is more");
        }
        else{
          let jwt=null;
          jwt=localStorage.getItem('authenticate');
          jwt="Bearer "+jwt;
          console.log(jwt);
          const config = {
            headers:{
              'Authorization':jwt
            }
          };
          axios.put(`http://localhost:8082/api/department/update/${data.i}`,dept,config).
          then(res=>{console.log(res);
          alert("Department updated successfully");
          hide()})
          .catch(error=>{
            console.log(error.response.status);
            navigateToLogin();
        });

        }
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
                <input type="number" className="form-control" id="capacity" placeholder="Enter capacity" min="20" max="100" value={capacity} onChange={(e)=>{setCapacity(e.target.value)}} required/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
  )
}

