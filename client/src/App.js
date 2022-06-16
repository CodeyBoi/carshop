import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import { MainPage, notFoundPage } from './pages/index';
import CarmodelList from './pages/carmodels';
import EmployeeList from './pages/employees';
import Dashboard from './components/dashboard';
import Login from './pages/login';
import Signup from './pages/signup';

import useToken from './components/useToken';

function App() {

  const { token, setToken } = useToken();

  const [user, setUser] = React.useState();

  // Token is just user id right now. TODO: change to real token
  React.useEffect(() => {
    if (token) {
      fetch(`/users?uid=${token}`, { method: 'GET' })
        .then(res => res.json())
        .then(data => setUser(data[0]));
    }
  }, [token]);

  return (
    <div className='wrapper'>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage token={token} setToken={setToken} user={user} />} />
            <Route path="/404" element={notFoundPage} />
            <Route path="/carmodels" element={<CarmodelList />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/signup" element={<Signup setToken={setToken} />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
