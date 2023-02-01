import logo from './logo.svg';
import './App.css';
import Header from './DepartmentCRUD/Header/Index.js'
import Department from './DepartmentCRUD/DepartmentHome/Index.js';
import Footer from './DepartmentCRUD/Footer/Index.js';
import AddDepartment from './DepartmentCRUD/AddDepartment/Index.js';
import FetchEmployee from './DepartmentCRUD/FetchEmployee/Index.js';
import LoginHeader from './DepartmentCRUD/LoginHeader/Index.js';
import Login from './DepartmentCRUD/Login/Index.js'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<><LoginHeader/><Login/></>}></Route>
          <Route exact path="/Department" element={<><Header/><Department/></>}></Route>
          <Route exact path="/Add" element={<><Header/><AddDepartment/></>}></Route>
          <Route exact path="/Fetch/:id" element={<><Header/><FetchEmployee/></>}></Route>
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;