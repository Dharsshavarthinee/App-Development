import React, { useState ,useEffect} from 'react';
import {
  Container, Typography, Box, Button, TextField, Paper, Input,
  CircularProgress, Alert
} from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { styled } from '@mui/material/styles';
import { useGeolocated } from 'react-geolocated';
import Layout from '../components/Layout.js';
import '../styles/Rescue.css';
import rescueImage from '../images/rescue1.jpg';
import L from 'leaflet';
import axios from 'axios';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const CustomButton = styled(Button)({
  backgroundColor: '#004d40',
  color: 'white',
  '&:hover': {
    backgroundColor: '#00332c',
  },
});

const LocationPicker = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng);
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
};

const Rescue = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  const [formData, setFormData] = useState({
    name: '',
    phoneNo: '',
    emailId: '',
    description: '',
    image: null
  });

  const [location, setLocation] = useState({ lat: '', lng: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const getAddressFromLatLng = async (lat, lng) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
        params: {
          format: 'json',
          lat,
          lon: lng,
        },
      });
      return response.data.display_name;
    } catch (err) {
      console.error(err);
      return 'Address not found';
    }
  };

  const handleLocationSelect = async (latlng) => {
    const address = await getAddressFromLatLng(latlng.lat, latlng.lng);
    setLocation({ lat: latlng.lat, lng: latlng.lng, address });
  };

  useEffect(() => {
    
    const email = localStorage.getItem('userEmail');
    if (email) {
      setFormData(prevFormData => ({
        ...prevFormData,
        emailId: email
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
  
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('phoneNo', formData.phoneNo);
    formDataObj.append('emailId', formData.emailId);
    formDataObj.append('location', location.address);
    formDataObj.append('description', formData.description);
  
    if (formData.image) {
      formDataObj.append('image', formData.image);
    }
  
    try {
      const response = await axios.post('http://localhost:8082/api/Rescue', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        setSuccess('Report submitted successfully!');
      } else {
        setError('Failed to submit report');
      }
    } catch (err) {
      setError('An error occurred during submission. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Layout>
      <Container maxWidth="md" className="rescue-container">
        <Paper elevation={3} className="rescue-paper">
          <Box textAlign="center" marginBottom={4}>
            <Typography variant="h3" gutterBottom className="rescue-heading">
              Report an Animal in Distress
            </Typography>
            <Typography variant="body1" paragraph>
              If you come across an injured or distressed animal, please report it to us immediately. Our rescue team is trained to handle emergency situations and provide the necessary care for these animals.
            </Typography>
            <img src={rescueImage} alt="Rescue" className="rescue-image" />
          </Box>

          <Box className="report-section">
            <Typography variant="h4" gutterBottom>
              How to Report
            </Typography>
            <Typography variant="body1" paragraph>
              Follow these steps to report an animal in distress:
            </Typography>
            <Typography variant="body1" paragraph>
              1. Ensure your safety first. Do not approach the animal if it is in a dangerous location or if you feel it might pose a threat.
            </Typography>
            <Typography variant="body1" paragraph>
              2. Take note of the animal's condition, location, and any visible injuries.
            </Typography>
            <Typography variant="body1" paragraph>
              3. Fill out the report form below with accurate details. Provide as much information as possible to help our team respond quickly and effectively.
            </Typography>
          </Box>

          <Box className="form-section">
            <Typography variant="h4" gutterBottom>
              Report Form
            </Typography>
            <Box className="report-form-container">
              <form className="report-form" onSubmit={handleSubmit}>
              <TextField
                    label="Your Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    name="name"
                    color="success"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                <TextField
                    label="Your Phone Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    inputProps={{ pattern: "\\d{10}", title: "Phone number must be 10 digits" }}
                    name="phoneNo"
                    color="success"
                    value={formData.phoneNo}
                    onChange={handleInputChange}
                  />
                <TextField
                    label="Your Email Id"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    email
                    name="emailId"
                    color="success"
                    value={formData.emailId}
                    readOnly
                  />
                <TextField
                  label="Animal Location"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  color="success"
                  value={location.address}
                  readOnly
                />
                {isGeolocationAvailable && isGeolocationEnabled && coords && (
                  <Box marginY={4}>
                    <Typography variant="h6" gutterBottom>
                      Select Animal Location on Map
                    </Typography>
                    <MapContainer center={[coords.latitude, coords.longitude]} zoom={15} style={{ height: '400px' }}>
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <LocationPicker onLocationSelect={handleLocationSelect} />
                    </MapContainer>
                  </Box>
                )}

                <TextField
                    label="Animal Condition/Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    multiline
                    rows={4}
                    name="description"
                    color="success"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                <fieldset>
                  <legend>Upload picture</legend>
                  <Input
                    type="file"
                    accept="image/*"
                    fullWidth
                    margin="normal"
                    required
                    color="success"
                    onChange={handleFileChange}
                  />
                </fieldset>

                <Box textAlign="center" marginTop={2}>
                  {loading ? (
                    <CircularProgress color="success" />
                  ) : (
                    <CustomButton variant="contained" type="submit">
                      Submit Report
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

export default Rescue;
