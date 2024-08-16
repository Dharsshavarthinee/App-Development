import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, CircularProgress, Alert, LinearProgress, Button } from '@mui/material';
import Layout from '../components/Layout';
import '../styles/User.css'; // Import the CSS file
import axios from 'axios';

const User = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');

    if (email) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8082/api/Register-user?emailId=${email}`);
          setUserDetails(response.data);
        } catch (error) {
          setError('Failed to fetch user details');
        }
      };

      const fetchAdoptions = async () => {
        try {
          const response = await axios.get(`http://localhost:8082/Adopt/user?email=${email}`);
          setAdoptions(response.data);
        } catch (error) {
          setError('Failed to fetch adoptions');
        }
      };

      Promise.all([fetchUserDetails(), fetchAdoptions()]).finally(() => setLoading(false));
    } else {
      setError('User not logged in');
      setLoading(false);
    }
  }, []);

  const getProgressValue = (status) => {
    switch (status) {
      case 'Pending':
        return 33;
      case 'Verified':
        return 66;
      case 'Adopted':
        return 100;
      default:
        return 0;
    }
  };

  const handleCancelApplication = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/Adopt/${id}`);
      setAdoptions(adoptions.filter(adoption => adoption.id !== id));
    } catch (error) {
      setError('Failed to cancel application');
    }
  };

  if (loading) {
    return (
      <Layout>
        <Container maxWidth="lg" className="user-container">
          <CircularProgress />
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg" className="user-container">
        {error && <Alert severity="error">{error}</Alert>}

        <Box className="user-details-section">
          {userDetails && (
            <Paper elevation={3} className="user-paper">
              <Box textAlign="center" marginBottom={3}>
                <Typography variant="h4" gutterBottom>
                  User Details
                </Typography>
              </Box>
              <Box className="user-details">
                <Typography variant="h6">Name: {userDetails.name}</Typography>
                <Typography variant="h6">Email: {userDetails.emailId}</Typography>
                <Typography variant="h6">Phone: {userDetails.phone}</Typography>
              </Box>
            </Paper>
          )}
        </Box>

        <Box className="adoptions-section">
          {adoptions.length > 0 && (
            <>
              <Typography variant="h5" gutterBottom>
                Adoption Applications
              </Typography>
              {adoptions.map(adoption => (
                <Paper key={adoption.id} className="adoption-paper">
                  <Typography variant="h6">Pet ID: {adoption.preferredPetId}</Typography>
                  <Typography variant="body1">Status: {adoption.status}</Typography>

                  <LinearProgress
                    variant="determinate"
                    value={getProgressValue(adoption.status)}
                    className="status-progress"
                  />
                  <Box className="status-labels">
                    <Typography variant="body2" className={`status-label ${adoption.status === 'Pending' ? 'active' : ''}`}>Pending</Typography>
                    <Typography variant="body2" className={`status-label ${adoption.status === 'Verified' ? 'active' : ''}`}>Verified</Typography>
                    <Typography variant="body2" className={`status-label ${adoption.status === 'Adopted' ? 'active' : ''}`}>Adopted</Typography>
                  </Box>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleCancelApplication(adoption.id)}
                    style={{ marginTop: '10px' }}
                  >
                    Cancel Application
                  </Button>
                </Paper>
              ))}
            </>
          )}
        </Box>

      </Container>
    </Layout>
  );
};

export default User;
