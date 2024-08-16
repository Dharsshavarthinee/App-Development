import React, { useState } from 'react';
import { Container, Typography, Box, Button, TextField, Paper, Link, Alert, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout.js';
import '../styles/Register.css';
import axios from 'axios'; 

const CustomButton = styled(Button)({
  backgroundColor: '#004d40',
  color: 'white',
  '&:hover': {
    backgroundColor: '#00332c',
  },
});

const Register = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (!passwordRegex.test(userDetails.password)) {
      setError('Password must be at least 8 characters long and contain at least 1 special character');
      setLoading(false);
      return;
    }
    if (userDetails.password !== userDetails.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Check if the user already exists
      const checkResponse = await axios.get(`http://localhost:8082/api/Register-user?emailId=${userDetails.email}`);
      const existingUsers = checkResponse.data;
      if (existingUsers.length > 0) {
        setError('Email already exists');
        setLoading(false);
        setTimeout(() => navigate('/login'), 3000);
        return;
      }

      // Register new user
      const response = await axios.post('http://localhost:8082/api/Register-user', {
        name: userDetails.name,
        emailId: userDetails.email,
        phone: userDetails.phone,
        password: userDetails.password
      });

      if (response.status === 200) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 3000); 
      } else {
        setError('Failed to register');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm" className="register-container">
        <Paper elevation={3} className="register-paper">
          <Box textAlign="center" marginBottom={4}>
            <Typography variant="h3" gutterBottom className="register-heading">
              Register
            </Typography>
          </Box>

          <Box className="form-section">
            <form className="register-form" onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                onChange={handleInputChange}
                color="success"
              />
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
                label="Phone"
                name="phone"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                inputProps={{ pattern: "\\d{10}", title: "Phone number must be 10 digits" }}
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
                inputProps={{ pattern: "^(?=.*[!@#$%^&*(),.?\":{}|<>])[a-zA-Z\\d!@#$%^&*(),.?\":{}|<>]{8,}$", title: "Password must be at least 8 characters long and contain at least 1 special character" }}
              />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                onChange={handleInputChange}
                color="success"
              />

              <Box textAlign="center" marginTop={2}>
                {loading ? (
                  <CircularProgress color="success" />
                ) : (
                  <CustomButton variant="contained" type="submit">
                    Register
                  </CustomButton>
                )}
              </Box>

              {error && <Alert severity="error" sx={{ marginTop: '20px' }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ marginTop: '20px' }}>{success}</Alert>}
            </form>
          </Box>

          <Box textAlign="center" marginTop={2}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link href="/login" color="inherit">
                Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
}

export default Register;
