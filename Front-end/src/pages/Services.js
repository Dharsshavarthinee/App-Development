import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles/Services.css';
import Layout from '../components/Layout.js';

import rescueImage from '../images/rescue-bg.png';
import adoptionImage from '../images/adopt-bg.png';
import transferImage from '../images/transfer-bg.png';
import petSittingImage from '../images/sitting-bg.png';
import discussionForumImage from '../images/forum-bg.png';
import bgImage from '../images/services-bg.jpeg';

const Services = () => {
  return (
    <Layout> 
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
              <Typography variant="body1" paragraph>
                Our Pet Rescue service is dedicated to saving injured and distressed animals. 
                We have a specialized team trained in animal first aid and emergency response. 
                Once an animal is reported, our team quickly mobilizes to provide immediate care.
                 We also work closely with local veterinarians to ensure that rescued animals receive necessary medical treatments.
                After stabilization, the animals are rehabilitated and prepared for adoption.
              </Typography>
              <Typography variant="body1" paragraph>
                Our rescue efforts don't stop at immediate care. We also focus on long-term recovery and well-being.
                Our ultimate goal is to ensure that every rescued animal finds a loving home where they can thrive.
              </Typography>
              <Button variant="contained" color="success" component={Link} to="/services/rescue" className="learn-more-button">
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
              <Typography variant="body1" paragraph>
                Our Pet Adoption service connects animals with loving families. We understand that adopting a pet is a significant commitment, so we ensure a thorough screening process to match pets with the right owners. Potential adopters are interviewed and educated about the specific needs and care requirements of the pet they are interested in.
              </Typography>
              <Typography variant="body1" paragraph>
                We also provide post-adoption support to help new pet owners transition smoothly. This includes access to resources such as veterinary care, training tips, and a community of other pet adopters. Our aim is to create lasting bonds between pets and their new families, ensuring a happy and healthy life for both.
              </Typography>
              <Button variant="contained" color="success" component={Link} to="/services/adopt" className="learn-more-button">
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
              <Typography variant="body1" paragraph>
                Our Ownership Transfer service helps pet owners who can no longer care for their pets. We understand that circumstances can change, making it difficult for owners to continue caring for their pets. Our service ensures a smooth and compassionate transition to a new home.
              </Typography>
              <Typography variant="body1" paragraph>
                We carefully vet potential new owners to ensure they are capable of providing a loving and stable environment for the pet. Throughout the transfer process, we prioritize the pet's well-being, providing them with the necessary support and care to adjust to their new home. Our follow-up support ensures that both the pet and the new owner have everything they need for a successful transition.
              </Typography>
              <Button variant="contained" color="success" component={Link} to="/services/transfer" className="learn-more-button">
                Learn More
              </Button>
            </Box>
          </Box>
        </Box>

        <Box className="service-section" style={{ backgroundImage: `url(${bgImage})` }}>
          <Box className="overlay">
            <img src={petSittingImage} alt="Pet Sitting" className="service-image" />
            <Box className="service-content">
              <Typography variant="h4" gutterBottom>
                Pet Sitting
              </Typography>
              <Typography variant="body1" paragraph>
                Our Pet Sitting service ensures your pets are well cared for while you're away. We provide professional pet sitters who are experienced in handling various types of pets and their unique needs. Whether it's feeding, walking, or just providing companionship, our sitters ensure your pet remains happy and healthy in your absence.
              </Typography>
              <Typography variant="body1" paragraph>
                We offer flexible scheduling to accommodate your needs, and our sitters can provide updates and photos to keep you informed about your pet's well-being. Trust us to provide the best care for your pet when you can't be there.
              </Typography>
              <Button variant="contained" color="success" component={Link} to="/services/sitting" className="learn-more-button">
                Learn More
              </Button>
            </Box>
          </Box>
        </Box>

   {/*
        <Box className="service-section" style={{ backgroundImage: `url(${bgImage})` }}>
          <Box className="overlay">
            <img src={discussionForumImage} alt="Discussion Forum" className="service-image" />
            <Box className="service-content">
              <Typography variant="h4" gutterBottom>
                Discussion Forum
              </Typography>
              <Typography variant="body1" paragraph>
                Our Discussion Forum provides a platform for pet owners to connect, share advice, and support each other. Whether you have questions about pet care, need recommendations, or just want to share your pet stories, our forum is a welcoming community for all pet lovers.
              </Typography>
              <Typography variant="body1" paragraph>
                Join discussions on various topics, participate in Q&A sessions with experts, and make new friends who share your passion for pets. Our forum is moderated to ensure a friendly and supportive environment for everyone.
              </Typography>
              <Button variant="contained" color="success" component={Link} to="/services/forum" className="learn-more-button">
                Learn More
              </Button>
            </Box>
          </Box>
        </Box>
      */}
       
      </Container>
    </Layout>
  );
}

export default Services;
