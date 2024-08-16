import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, Box, Button, TextField, Paper, CircularProgress, Alert, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useGeolocated } from 'react-geolocated';
import Layout from '../components/Layout';
import sittingImage from '../images/sitting.jpg';

const CustomButton = styled(Button)({
  backgroundColor: '#004d40',
  color: 'white',
  '&:hover': {
    backgroundColor: '#00332c',
  },
});

const Sitting = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [petType, setPetType] = useState('');
  const [owner, setOwner] = useState('');
  const [mobile, setMobile] = useState('');
  const [breed, setBreed] = useState('');
  const [instruction, setInstruction] = useState('');
  
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
  
    
    const petSittingData = {
      ownerName: owner,
      mobileNum: mobile, 
      petType: petType,
      breed: breed,     
      startDate: startDate,
      endDate: endDate,
      specialInstructions: instruction, 
      location: location,
    };
  
    try {
      const response = await axios.post('http://localhost:8082/api/pet-sitting', petSittingData);
      setSuccess('Pet sitting request submitted successfully!');
      console.log('Response:', response.data);
    } catch (err) {
      setError('Failed to submit request. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  

  const today = new Date().toISOString().split('T')[0];

  return (
    <Layout>
      <Container maxWidth="md" sx={{ padding: '20px', backgroundColor: '#e0f7f4', color: '#004d40' }}>
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <Box textAlign="center" marginBottom={4}>
            <Typography variant="h3" gutterBottom sx={{ marginTop: '20px', fontWeight: 'bold', color: '#004d40' }}>
              Request Pet Sitting
            </Typography>
            <Typography variant="body1" paragraph>
              If you need a pet sitter, please fill out the form below with the details. Our pet sitting team is experienced and ready to take care of your pet while you are away.
            </Typography>
            <img src={sittingImage} alt="Sitting" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px' }} />
          </Box>

          <Box sx={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
              How to Request
            </Typography>
            <Typography variant="body1" paragraph>
              Follow these steps to request a pet sitter:
            </Typography>
            <Typography variant="body1" paragraph>
              1. Ensure you provide all the necessary details about your pet and your requirements.
            </Typography>
            <Typography variant="body1" paragraph>
              2. Fill out the request form below accurately. Provide as much information as possible to help our team cater to your needs.
            </Typography>
          </Box>

          <Box sx={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
              Request Form
            </Typography>
            <Box sx={{ marginTop: '20px', padding: '20px', backgroundColor: '#ffffff', border: '1px solid #004d40', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Owner Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  color="success"
                  onChange={(e) => setOwner(e.target.value)}
                />
                <TextField
                  label="Mobile Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  inputProps={{ pattern: "\\d{10}", title: "Phone number must be 10 digits" }}
                  color="success"
                  onChange={(e) => setMobile(e.target.value)}
                />
                <FormControl fullWidth margin="normal" required>
                  <InputLabel color="success">Type of Pet</InputLabel>
                  <Select
                    value={petType}
                    onChange={(e) => setPetType(e.target.value)}
                    color="success"
                  >
                    <MenuItem value="dog">Dog</MenuItem>
                    <MenuItem value="cat">Cat</MenuItem>
                    <MenuItem value="bird">Bird</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Breed of Pet"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  color="success"
                  onChange={(e) => setBreed(e.target.value)}
                />
                <TextField
                  label="Start Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: today }}
                />
                <TextField
                  label="End Date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  fullWidth
                  required
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: startDate || today }}
                />
                <TextField
                  label="Special Instructions"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  onChange={(e) => setInstruction(e.target.value)}
                  color="success"
                />
                <TextField
                  label="Location (Address)"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  color="success"
                  value={location}
                  onChange={handleLocationChange}
                />

                <Box textAlign="center" marginTop={2}>
                  {loading ? (
                    <CircularProgress color="success" />
                  ) : (
                    <CustomButton variant="contained" type="submit">
                      Submit Request
                    </CustomButton>
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

export default Sitting;