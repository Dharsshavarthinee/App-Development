import React from 'react';
import AdminHeader from './AdminHeader';
import { Container, Typography, Box } from '@mui/material';
import './Admin.css';

const Admin = () => {
  return (
    <div>
      <AdminHeader />
      <Container maxWidth="lg">
        <Box my={4}>
          <Typography variant="h3" component="h1" gutterBottom>
            Admin Dashboard
          </Typography>
          <Typography variant="body1">
            Welcome to the Admin Dashboard. Here you can manage users, view settings, and perform other administrative tasks.
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Admin;
