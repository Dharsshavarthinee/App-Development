import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Button, TextField, Paper, Input,
  CircularProgress, Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Layout from '../components/Layout.js';
import '../styles/Transfer.css';
import transferImage from '../images/transfer1.jpg';

const CustomButton = styled(Button)({
  backgroundColor: '#004d40',
  color: 'white',
  '&:hover': {
    backgroundColor: '#00332c',
  },
});

const Transfer = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    name: '',
    species: '',
    age: '',
    description: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setFormData(prevDetails => ({
        ...prevDetails,
        ownerEmail: email
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const validateForm = () => {
    if (!formData.image) {
      setError('Please upload a picture of your pet.');
      return false;
    }
    if (!formData.ownerName || !formData.ownerPhone || !formData.ownerEmail || !formData.name || !formData.species || !formData.age || !formData.description) {
      setError('Please fill out all fields.');
      return false;
    }
    if (isNaN(formData.age)) {
      setError('Pet age must be a number.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('phoneNo', formData.ownerPhone);
    formDataObj.append('emailId', formData.ownerEmail);
    formDataObj.append('petName', formData.name);
    formDataObj.append('petBreed', formData.species);
    formDataObj.append('petAge', formData.age);
    formDataObj.append('description', formData.description);

    if (formData.image) {
      formDataObj.append('image', formData.image);
    }

    try {
      const response = await axios.post('http://localhost:8082/api/Ownership-Transfer', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        setSuccess('Transfer details submitted successfully!');
      } else {
        setError('Failed to submit transfer details');
      }
    } catch (err) {
      setError('An error occurred during submission. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container maxWidth="md" className="transfer-container">
        <Paper elevation={3} className="transfer-paper">
          <Box textAlign="center" marginBottom={4}>
            <Typography variant="h3" gutterBottom className="transfer-heading">
              Pet Ownership Transfer
            </Typography>
            <Typography variant="body1" paragraph>
              Our Ownership Transfer service helps pet owners who can no longer care for their pets. We ensure a smooth and compassionate transition to a new home.
            </Typography>
            <Typography variant="body1" paragraph>
              Please fill out the form below with accurate and detailed information about your pet and your contact details to start the transfer process.
            </Typography>
            <img src={transferImage} alt="Transfer" className="transfer-image" />
          </Box>

          <Box className="transfer-steps">
            <Typography variant="h4" gutterBottom>
              Steps to Transfer Ownership
            </Typography>
            <Typography variant="body1" paragraph className="step">
              <strong>1.</strong> Complete the transfer form below with accurate and detailed information about your pet and your contact details.
            </Typography>
            <Typography variant="body1" paragraph className="step">
              <strong>2.</strong> Our team will review your application and contact you to discuss the details and answer any questions you might have.
            </Typography>
            <Typography variant="body1" paragraph className="step">
              <strong>3.</strong> If the application is approved, we will start searching for a suitable new owner for your pet. This includes vetting potential adopters and ensuring they are capable of providing a good home.
            </Typography>
            <Typography variant="body1" paragraph className="step">
              <strong>4.</strong> Once a suitable match is found, we will arrange a meet-and-greet session between your pet and the potential new owner.
            </Typography>
            <Typography variant="body1" paragraph className="step">
              <strong>5.</strong> If the meet-and-greet is successful, we will proceed with the transfer paperwork and finalize the process.
            </Typography>
            <Typography variant="body1" paragraph className="step">
              <strong>6.</strong> After the transfer, we will provide follow-up support to ensure that your pet is adjusting well to their new home.
            </Typography>
          </Box>

          <Box id="transfer-form" className="form-section">
            <Typography variant="h4" gutterBottom>
              Transfer Form
            </Typography>
            <Box className="transfer-form-container">
              <form className="transfer-form" onSubmit={handleSubmit}>
                <TextField
                  label="Your Name"
                  name="ownerName"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  onChange={handleInputChange}
                  color="success"
                />
                <TextField
                  label="Your Phone Number"
                  name="ownerPhone"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  inputProps={{ pattern: "\\d{10}", title: "Phone number must be 10 digits" }}
                  onChange={handleInputChange}
                  color="success"
                />
                <TextField
                  label="Your Email"
                  name="ownerEmail"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  onChange={handleInputChange}
                  color="success"
                  value={formData.ownerEmail}
                />

                <fieldset className="pet-details-fieldset">
                  <legend>Pet Details</legend>
                  <TextField
                    label="Pet's Name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    onChange={handleInputChange}
                    color="success"
                  />
                  <TextField
                    label="Pet's Species"
                    name="species"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    onChange={handleInputChange}
                    color="success"
                  />
                  <TextField
                    label="Pet's Age"
                    name="age"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    inputProps={{ type: 'number' }}
                    onChange={handleInputChange}
                    color="success"
                  />
                  <TextField
                    label="Pet's Description"
                    name="description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    multiline
                    rows={4}
                    onChange={handleInputChange}
                    color="success"
                  />
                  <fieldset>
                    <legend>Upload Pet Picture</legend>
                    <Input
                      type="file"
                      accept="image/*"
                      fullWidth
                      margin="normal"
                      required
                      onChange={handleFileChange}
                    />
                  </fieldset>
                  {formData.image && (
                    <Typography variant="body2" color="textSecondary">
                      {formData.image.name}
                    </Typography>
                  )}
                </fieldset>

                <Box textAlign="center" marginTop={2}>
                  {loading ? (
                    <CircularProgress color="success" />
                  ) : (
                    <CustomButton variant="contained" type="submit">
                      Submit Application
                    </CustomButton>
                  )}
                </Box>

                {error && <Alert severity="error" marginTop={2}>{error}</Alert>}
                {success && <Alert severity="success" marginTop={2}>{success}</Alert>}
              </form>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
}

export default Transfer;
