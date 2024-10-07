import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Navbar.css'; 

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('authToken');
    navigate('/login');
  };
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>Expense Tracker</h2>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/dashboard">Home</Link>
        </li>
        <li>
          <Link to="/expenses">Expenses</Link>
        </li>
        <li>
          <Link to="/budgets">Budgets</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
        <li>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
