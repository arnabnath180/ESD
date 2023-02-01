import axios from 'axios';
import React, {useState, useEffect} from 'react';
import "./Index.css";
import DepartmentUpdate from '../DepartmentUpdate/Index.js';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import { useNavigate } from 'react-router-dom';
export default function Index() {
      const [dept, setDepartment]=useState([]);
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
        axios.get("http://localhost:8082/api/department/getall",config).
        then(res=>{setDepartment(res.data);console.log(res.data)})
        .catch(error=>{
          console.log(error.response.status);
          navigateToLogin();
        });
      },[]);
      const onDelete = (department_id)=>{
        let jwt=null;
        jwt=localStorage.getItem('authenticate');
        jwt="Bearer "+jwt;
        console.log(jwt);
        const config = {
          headers:{
            'Authorization':jwt
          }
        };
        axios.delete(`http://localhost:8082/api/department/delete/${department_id}`,config).
        then(res=>{console.log(res.data)})
        .catch(error=>{
          console.log(error.response.status);
          navigateToLogin();
        });
        setDepartment(dept.filter((d)=>{
            return d.department_id !== department_id;
        }
        ))
      } 
      

      
      const onGet_emp = (department_id)=>{
        navigate(`/Fetch/${department_id}`);
      } 
      const [isOpen, setIsOpen] = React.useState(false);

      const showModal = () => {
        setIsOpen(true);
      };

      const hideModal = () => {
        setIsOpen(false);
      };
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
        axios.get("http://localhost:8082/api/department/getall",config).
        then(res=>{setDepartment(res.data);console.log(res.data)})
        .catch(error=>{
          console.log(error.response.status);
          navigateToLogin();
        });
      },[isOpen]);

      const [d,setD]=useState([{i:0}])
      const onUpdate = (department_id)=>{
        setD([{i:department_id}]);
        showModal();
      };

      return (
        <div className='departmentlist-container container'>
            <Modal show={isOpen} onHide={hideModal}>
              <Modal.Header>
              <Modal.Title>Department Update</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <DepartmentUpdate data={d[0]} hide={hideModal}/>
              </Modal.Body>
              <Modal.Footer>
            
                <button onClick={hideModal}>Cancel</button>
              </Modal.Footer>
            </Modal>
            
            <h3>Department List</h3>
            <ul className="list-group">
            {dept.length===0? <p className='empty'>No Department to display</p> :
            dept.map((item)=>{
                return(
                    <li className="list-group-item dept">
                        <h4>Department Id : {item.department_id}</h4>
                        <h4>Department Name : {item.name}</h4>
                        <h4>Department Capacity : {item.capacity}</h4>
                        <button type="button" className="btn btn-danger" onClick={()=>onDelete(item.department_id)}>Delete</button>
                        <button type="button" className="btn btn-primary" onClick={()=>onGet_emp(item.department_id)}>Get Employees</button>
                        <button type="button" className="btn btn-warning" onClick={()=>onUpdate(item.department_id)}>Update</button>
                    </li>
                    )
                })}
            </ul>
        </div>
      )
}
