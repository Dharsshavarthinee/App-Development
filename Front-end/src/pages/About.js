import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import Layout from '../components/Layout.js';
import '../styles/About.css';
import aboutImage from '../images/rescue.jpg';

const About = () => {
  return (
    <Layout>
      <Container maxWidth="md" className="about-container">
        <Paper elevation={3} className="about-paper">
          <Box textAlign="center" marginBottom={4}>
            <Typography variant="h3" gutterBottom className="about-heading">
              Purrfect Care
            </Typography>
            <Typography variant="h5" gutterBottom className="about-tagline">
              Be a pawrent today!
            </Typography>
            <img src={aboutImage} alt="About Purrfect Care" className="about-image" />
          </Box>

          <Box className="mission-section">
            <Typography variant="h4" gutterBottom className="section-heading">
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              At Purrfect Care, our mission is to connect loving families with pets in need of a home. 
              We believe that every pet deserves a safe, caring, and permanent home. 
              We are dedicated to facilitating pet adoptions, providing excellent care for our animals, and supporting pet owners through every step of the adoption process.
            </Typography>
          </Box>

          <Box className="why-choose-us-section">
            <Typography variant="h4" gutterBottom className="section-heading">
              Why Choose Us?
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Comprehensive Care:</strong> 
              We ensure that every pet in our care receives the best possible medical attention, nutrition, and love.
              Our team of veterinarians and caregivers work tirelessly to keep our animals healthy and happy.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Experienced Team:</strong> 
              Our team of adoption specialists is experienced and passionate about finding the right match between pets and families. 
              We take the time to understand the needs and lifestyles of both the pets and the adopters to ensure a perfect fit.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Support and Guidance:</strong> 
              We provide ongoing support to new pet owners, including advice on pet care, training resources, and access to a community of fellow pet parents. 
              Our goal is to make the transition as smooth as possible for both the pet and the adopter.
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Commitment to Animal Welfare:</strong> 
              We are committed to the well-being of every animal. 
              We advocate for responsible pet ownership and work to reduce the number of homeless pets through education, spaying, and neutering programs.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
}

export default About;
