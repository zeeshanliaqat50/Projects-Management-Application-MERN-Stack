import React from 'react'
import {Link} from 'react-router-dom'
import './Nav.css'

const Nav=() =>{
  return (
  <div>
    <ul className="navbar">
    <li>
      <Link to="/Modify">Modify</Link>
    </li>
    <li>
      <Link to="/List">List</Link>
    </li>
    <li>
      <Link to="/Delete">Delete</Link>
    
    </li>
    <li>
        <Link to="/Add"></Link>
    </li>
    </ul>
  </div>
  );
}







export default Nav
