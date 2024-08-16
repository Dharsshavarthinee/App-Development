import React, { useState } from 'react';
import { Container, Typography, Box, Button, TextField, Paper, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout.js';
import { useAuth } from '../components/AuthContext';
import '../styles/Login.css';
import axios from 'axios';

const CustomButton = styled(Button)({
  backgroundColor: '#004d40',
  color: 'white',
  '&:hover': {
    backgroundColor: '#00332c',
  },
});

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.get(`http://localhost:8082/api/Register-user?emailId=${credentials.email}`);
      const users = response.data;
      if (users && users.password === credentials.password) {
        console.log('Login successful');
        login();
        localStorage.setItem('userEmail', credentials.email);
        if (credentials.email === 'admin@gmail.com') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm" className="login-container">
        <Paper elevation={3} className="login-paper">
          <Box textAlign="center" marginBottom={4}>
            <Typography variant="h3" gutterBottom className="login-heading">
              Login
            </Typography>
          </Box>

          <Box className="form-section">
            <form className="login-form" onSubmit={handleSubmit}>
              <TextField
                label="Email"
                name="email"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                onChange={handleInputChange}
                color="success"
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                onChange={handleInputChange}
                color="success"
              />

              <Box textAlign="center" marginTop={2}>
                <CustomButton variant="contained" type="submit">
                  Login
                </CustomButton>
              </Box>
            </form>
          </Box>

          <Box textAlign="center" marginTop={2}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link href="/register" color="inherit">
                Register
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Login;
