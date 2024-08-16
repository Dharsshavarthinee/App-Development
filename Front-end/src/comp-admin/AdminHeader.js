import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

import logo from '../images/logo-title.png';
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

const AdminHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [logoutMessage, setLogoutMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    setLogoutMessage('Successfully logged out');
    setTimeout(() => setLogoutMessage(''), 3000);
    navigate('/login');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAdminDetails = () => {
    handleClose();
    navigate('/admin-details');
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Purrfect Care Logo" className="logo-img" />
        </div>
        <nav className="nav">
          <ul>
            <li className={location.pathname === '/admin/dashboard' ? 'active' : ''}>
              <Link to="/admin/dashboard">Dashboard</Link>
            </li>
            <li className={location.pathname === '/admin/users' ? 'active' : ''}>
              <Link to="/admin/users">Users</Link>
            </li>
            <li className={location.pathname === '/admin/services' ? 'active' : ''}>
              <Link to="/admin/services">Services</Link>
            </li>
            <li className={location.pathname === '/admin/feedback' ? 'active' : ''}>
              <Link to="/admin/feedback">Feedbacks</Link>
            </li>
            <li>
              <IconButton onClick={handleClick}>
                <PersonIcon sx={{ fontSize: 20, color: 'white' }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {/*<MenuItem onClick={handleAdminDetails}>Admin Details</MenuItem>*/}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </li>
          </ul>
        </nav>
      </header>
      {logoutMessage && <div className="logout-message">{logoutMessage}</div>}
    </>
  );
};

export default AdminHeader;


