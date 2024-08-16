import React, { useState } from 'react';
import { Container, Typography, Box, Grid, TextField, Button, Paper, CircularProgress, Alert, IconButton } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import Layout from '../components/Layout';
import '../styles/Contact.css';
import axios from 'axios';

const Contact = () => {
  const [formDetails, setFormDetails] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('http://localhost:8082/api/contact', formDetails);
      if (response.status === 200) {
        setSuccess('Message sent successfully!');
        setFormDetails({ name: '', email: '', message: '' });
      } else {
        setError('Failed to send message.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container maxWidth="lg" className="contact-container">
        <Box textAlign="center" marginBottom={4}>
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="h6" paragraph>
            We'd love to hear from you! Please fill out the form below to get in touch with us.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box className="contact-details" textAlign="left">
              <Typography variant="h4" gutterBottom>
                Get in Touch
              </Typography>
              <Box display="flex" alignItems="center" marginBottom={2}>
                <IconButton className="contact-icon" color="primary">
                  <LocationOn />
                </IconButton>
                <Typography variant="body1" marginLeft={1}>
                123 Main Street, Coimbatore,India,
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" marginBottom={2}>
                <IconButton href="mailto:contact@purrfectcare.com" className="contact-icon" color="primary">
                  <Email />
                </IconButton>
                <Typography variant="body1" marginLeft={1}>
                Email: petcare@gmail.com
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" marginBottom={2}>
                <IconButton className="contact-icon" color="primary">
                  <Phone />
                </IconButton>
                <Typography variant="body1" marginLeft={1}>
                  +91 6356352464
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} className="contact-form">
              <Box padding={3}>
                <Typography variant="h4" gutterBottom>
                  Send Feedback
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    onChange={handleChange}
                    value={formDetails.name}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    onChange={handleChange}
                    value={formDetails.email}
                  />
                  <TextField
                    label="Message"
                    name="message"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    required
                    onChange={handleChange}
                    value={formDetails.message}
                  />
                  <Box textAlign="center" marginTop={2}>
                    {loading ? (
                      <CircularProgress color="primary" />
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        className="contact-submit-button"
                      >
                        Send Message
                      </Button>
                    )}
                  </Box>
                </form>
                {error && <Alert severity="error" sx={{ marginTop: '20px' }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ marginTop: '20px' }}>{success}</Alert>}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Contact;