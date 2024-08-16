import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Typography, Box, Button, TextField, Paper, Card, CardMedia, CardContent, CircularProgress, Alert
} from '@mui/material';
import Layout from '../components/Layout.js';
import '../styles/Adopt.css';
import adoptionImage from '../images/adopt1.jpg';

const adoptablePets = [
  {
    id: 1,
    name: 'Bella',
    image: '/images/adoptable/1.jpg',
    description: 'A friendly and playful dog looking for a loving home.'
  },
  {
    id: 2,
    name: 'Max',
    image: '/images/adoptable/2.jpg',
    description: 'A calm and gentle cat that enjoys quiet afternoons.'
  },
  {
    id: 3,
    name: 'Charlie',
    image: '/images/adoptable/3.jpg',
    description: 'A curious kitten with a lot of energy and love to give.'
  },
  {
    id: 4,
    name: 'Luna',
    image: '/images/adoptable/4.jpg',
    description: 'A sweet and affectionate bunny who loves to cuddle.'
  },
  {
    id: 5,
    name: 'Rocky',
    image: '/images/adoptable/5.jpg',
    description: 'An adventurous dog who loves the outdoors and playing fetch.'
  },
];

const Adopt = () => {
  const [preferredPetId, setPreferredPetId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phoneNo: '',
    email: '',
    address: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdoptClick = (pet) => {
    setPreferredPetId(pet.id);
    window.scrollTo(0, document.getElementById('adoption-form').offsetTop);
  };

  useEffect(() => {
    // Retrieve email from localStorage
    const email = localStorage.getItem('userEmail');
    if (email) {
      setFormData(prevFormData => ({
        ...prevFormData,
        email: email
      }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('http://localhost:8082/api/Adopt', {
        ...formData,
        preferredPetId,
      });
      setTimeout(() => {
        setLoading(false);
        setSuccess('Application submitted successfully!');
      }, 2000);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
      setLoading(false);
      setSuccess('');
    }
  };

  return (
    <Layout>
      <Container maxWidth="md" className="adopt-container">
        <Paper elevation={3} className="adopt-paper">
          <Box textAlign="center" marginBottom={4}>
            <Typography variant="h3" gutterBottom className="adopt-heading">
              Adopt a Pet
            </Typography>
            <Typography variant="body1" paragraph>
              Our adoption process is designed to ensure that pets find the best possible homes. We work closely with potential adopters to match them with the right pet based on their lifestyle, preferences, and experience.
            </Typography>
            <Typography variant="body1" paragraph>
              Below are the steps to adopt a pet from us. Please read through them carefully and fill out the adoption form to start the process.
              <img src={adoptionImage} alt="Adopt" className="adopt-image" />
            </Typography>
          </Box>

          <Box className="adoption-steps">
            <Typography variant="h4" gutterBottom>
              Steps to Adopt
            </Typography>
            <Typography variant="body1" paragraph className="step">
              <strong>1.</strong> Browse through our list of available pets and find one that fits your preferences.
            </Typography>
            <Typography variant="body1" paragraph className="step">
              <strong>2.</strong> Fill out the adoption form below with accurate and detailed information about yourself and your household.
            </Typography>
            <Typography variant="body1" paragraph className="step">
              <strong>3.</strong> Our team will review your application and contact you for a phone interview to discuss your application and answer any questions you might have.
            </Typography>
            <Typography variant="body1" paragraph className="step">
              <strong>4.</strong> If your application is approved, we will schedule a meet-and-greet with the pet. This gives you an opportunity to interact with the pet and see if it's a good match.
            </Typography>
            <Typography variant="body1" paragraph className="step">
              <strong>5.</strong> Once the meet-and-greet is successful, we will proceed with the adoption paperwork and finalize the adoption process.
            </Typography>
          </Box>

          <Box className="adoptable-pets-section">
            <Typography variant="h4" gutterBottom>
              Adoptable Pets
            </Typography>
            <Box className="adoptable-pets-row">
              {adoptablePets.map((pet) => (
                <Card className="pet-card" key={pet.id}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={pet.image}
                    alt={pet.name}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {pet.name} (ID: {pet.id})
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {pet.description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleAdoptClick(pet)}
                      className="adopt-button"
                    >
                      Adopt
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>

          <Box id="adoption-form" className="form-section">
            <Typography variant="h4" gutterBottom>
              Adoption Form
            </Typography>
            <Box sx={{ marginTop: '20px', padding: '20px', backgroundColor: '#ffffff', border: '1px solid #004d40', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
              <form className="adoption-form" onSubmit={handleSubmit}>
                <TextField
                  label="Your Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  color="success"
                />
                <TextField
                  label="Your Phone Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleInputChange}
                  inputProps={{ pattern: "\\d{10}", title: "Phone number must be 10 digits" }}
                  color="success"
                />
                <TextField
                  label="Your Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  email
                  name="email"
                  value={formData.email}
                  color="success"
                  readOnly
                />
                <TextField
                  label="Preferred Pet ID"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  name="preferredPetId"
                  value={preferredPetId}
                  InputProps={{
                    readOnly: true,
                  }}
                  color="success"
                />
                <TextField
                  label="Your Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  multiline
                  rows={2}
                  color="success"
                />
                <TextField
                  label="Why do you want to adopt this pet?"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  color="success"
                />
                <Box textAlign="center" marginTop={2}>
                  {loading ? (
                    <CircularProgress color="success" />
                  ) : (
                    <Button variant="contained" color="success" type="submit">
                      Submit Application
                    </Button>
                  )}
                </Box>

                {error && <Alert severity="error" sx={{ marginTop: '20px' }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ marginTop: '20px' }}>{success}</Alert>}
              </form>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
}

export default Adopt;
