import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import './Index.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel  from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
export default function Index() {
    const {id}=useParams();
    const[emp_list,setL]=useState([]);
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
        axios.get(`http://localhost:8082/api/department/get/${id}`,config).
        then(res=>{
            setL(res.data.emp_list);
        })
        .catch(error=>{
            console.log(error.response.status);
            navigateToLogin();
        });
    },[])
    console.log(emp_list);
  return (
    <div className='container'>
        {emp_list.length===0? <p className='empty'>No Employee to display</p> :
        <Row xs={1} sm={2} md={3} className="g-4">
        {emp_list.map((item)=>{
        return(
                <Col>
                    <Card style={{ width: '16rem' }} >
                    <img src={`${item.photograph_path}`}/>
                    <Card.Body>
                        <Card.Text>
                            Employee : {item.employee_id} <br/> Email : {item.email} <br/>
                            Name : {item.first_name} {item.last_name} <br/> Title : {item.title}
                        </Card.Text>
                    </Card.Body>
                    </Card>
                </Col>
        )
        })}
        </Row>
        }
        
        
    </div>
  )
}
