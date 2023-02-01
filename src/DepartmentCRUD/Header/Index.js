import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Index() {
    const navigate=useNavigate();
    const navigateToLogin=()=>{
        navigate(`/`);
    }
    const onLogout=()=>{
        localStorage.clear('authenticate');
        navigateToLogin();
    }
  return (
    <div className='header-component'>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand">DepartmentCRUD</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/Department">Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/Add">Add Department</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        <li className="nav-item ">
                            <form className="form-inline">
                                <button type="button" class="btn btn-primary" onClick={()=>onLogout()}>Logout</button>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}
