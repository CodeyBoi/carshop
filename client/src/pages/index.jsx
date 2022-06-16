import React from 'react';
import { Link } from 'react-router-dom';

export const MainPage = ({ token, setToken, user }) => {

  const handleLogout = () => {
    setToken(null);
    window.location = '/';
  }

  return (
    <header className='wrapper'>
      <h1>{user ? `Welcome, ${user.name}!` :
        'Welcome to the Carshop Database™!'}</h1>
      <p>This is a database of car models and their prices.</p>
      <ul>
        <li><Link to='/carmodels'>Car models</Link></li>
        <li><Link to='/employees'>Employees</Link></li>
      </ul>

      <div style={user ? { pointerEvents: "none", opacity: "0" } : {}}>
        <Link to='/login' style={{ position: "absolute", right: "130px", top: "20px" }}>
          <button className="styled button">Login</button>
        </Link>
      </div>

      <div style={user ? { pointerEvents: "none", opacity: "0" } : {}}>
        <Link to='/signup' style={{ position: "absolute", right: "30px", top: "20px" }}>
          <button className="styled button">Sign up</button>
        </Link>
      </div>

      <div style={!user?.employee_id ? { pointerEvents: "none", opacity: "0" } : {}}>
        <Link to='/dashboard' style={{ position: "absolute", right: "130px", top: "20px" }}>
          <button className="styled button">Account</button>
        </Link>
      </div>

      <div style={!user ? { pointerEvents: "none", opacity: "0" } : {}}>
        <button
          className="styled button"
          style={{ position: "absolute", right: "30px", top: "20px" }}
          onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export const notFoundPage = (
  <div>
    <header className='wrapper'>
      <h1 align="center">404</h1>
      <p>
        The page you were looking for cannot be found.
      </p>
    </header>
  </div>
);

export const homeButton = (
  <Link style={{ position: "absolute", top: "20px", left: "30px" }} to="/">
    <button className='styled button'>Back to Home</button>
  </Link>
);