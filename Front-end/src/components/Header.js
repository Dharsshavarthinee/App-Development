import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import './Header.css';
import logo from '../images/logo-title.png';
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [logoutMessage, setLogoutMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    setLogoutMessage('Successfully logged out');
    setTimeout(() => setLogoutMessage(''), 3000); 
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserDetails = () => {
    handleClose();
    navigate('/user'); 
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Purrfect Care Logo" className="logo-img" />
        </div>
        <nav className="nav">
          <ul>
            <li className={location.pathname === '/home' ? 'active' : ''}>
              <Link to="/home">Home</Link>
            </li>
            <li className={location.pathname === '/services' ? 'active' : ''}>
              <Link to="/services">Services</Link>
            </li>
            <li className={location.pathname === '/about' ? 'active' : ''}>
              <Link to="/about">About</Link>
            </li>
            <li className={location.pathname === '/contact' ? 'active' : ''}>
              <Link to="/contact">Contact</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <IconButton onClick={handleClick}>
                    <PersonIcon sx={{ fontSize: 20, color: 'white' }} />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleUserDetails}>User Details</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </li>
              </>
            ) : (
              <li className={location.pathname === '/login' ? 'active' : ''}>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      {logoutMessage && <div className="logout-message">{logoutMessage}</div>}
    </>
  );
};

export default Header;
