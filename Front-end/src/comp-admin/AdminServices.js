import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';


import rescueImage from '../images/rescue-bg.png';
import adoptionImage from '../images/adopt-bg.png';
import transferImage from '../images/transfer-bg.png';
import petSittingImage from '../images/rescue-bg.png';
import discussionForumImage from '../images/rescue-bg.png';
import bgImage from '../images/services-bg.jpeg';
import AdminHeader from './AdminHeader';

const AdminServices = () => {
  return (
    <div>
        <AdminHeader />
      <Container maxWidth="lg" className="services-container">
        <Typography variant="h3" gutterBottom className="services-heading">
          Our Services
        </Typography>

        <Box className="service-section" style={{ backgroundImage: `url(${bgImage})` }} id="rescue">
          <Box className="overlay">
            <img src={rescueImage} alt="Pet Rescue" className="service-image" />
            <Box className="service-content">
              <Typography variant="h4" gutterBottom>
                Pet Rescue
              </Typography>
              <Button variant="contained" color="success" component={Link} to="/admin/services/rescue" className="learn-more-button">
                Learn More
              </Button>
            </Box>
          </Box>
        </Box>

        <Box className="service-section" style={{ backgroundImage: `url(${bgImage})` }}>
          <Box className="overlay">
            <img src={adoptionImage} alt="Pet Adoption" className="service-image" />
            <Box className="service-content">
              <Typography variant="h4" gutterBottom>
                Pet Adoption
              </Typography>
              <Button variant="contained" color="success" component={Link} to="/admin/services/adopt" className="learn-more-button">
                Learn More
              </Button>
            </Box>
          </Box>
        </Box>

        <Box className="service-section" style={{ backgroundImage: `url(${bgImage})` }}>
          <Box className="overlay">
            <img src={transferImage} alt="Ownership Transfer" className="service-image" />
            <Box className="service-content">
              <Typography variant="h4" gutterBottom>
                Ownership Transfer
              </Typography>
              <Button variant="contained" color="success" component={Link} to="/admin/services/transfer" className="learn-more-button">
                Learn More
              </Button>
            </Box>
          </Box>
        </Box>
{/*
        <Box className="service-section" style={{ backgroundImage: `url(${bgImage})` }}>
          <Box className="overlay">
            <img src={petSittingImage} alt="Pet Sitting" className="service-image" />
            <Box className="service-content">
              <Typography variant="h4" gutterBottom>
                Pet Sitting
              </Typography>
              <Button variant="contained" color="success" component={Link} to="/admin/services/sitting" className="learn-more-button">
                Learn More
              </Button>
            </Box>
          </Box>
        </Box>

        <Box className="service-section" style={{ backgroundImage: `url(${bgImage})` }}>
          <Box className="overlay">
            <img src={discussionForumImage} alt="Discussion Forum" className="service-image" />
            <Box className="service-content">
              <Typography variant="h4" gutterBottom>
                Discussion Forum
              </Typography>
              <Button variant="contained" color="success" component={Link} to="/admin/services/forum" className="learn-more-button">
                Learn More
              </Button>
            </Box>
          </Box>
        </Box>
*/}
      </Container>
    </div>
  );
}

export default AdminServices;
