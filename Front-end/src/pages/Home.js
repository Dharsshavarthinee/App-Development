import React from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import Layout from '../components/Layout.js';

import safetyImage from '../images/safety.jpg';
import rescueImage from '../images/rescue.jpg';
import adoptionImage from '../images/adopt.jpg';
import transferImage from '../images/transfer.jpg';
import petSittingImage from '../images/sitting.jpg'; 
import forumImage from '../images/forum.jpeg'; 

const Home = () => {
  return (
    <Layout>
      <Container maxWidth="lg" className="home-container">
        <Box textAlign="center" marginBottom={4}>
          <Typography variant="h2" gutterBottom>
            Welcome to Purrfect Care
          </Typography>
          <Typography variant="h5" paragraph>
            We are dedicated to providing the best care and support for animals in need.
            Our services ensure a smooth and compassionate process for animal rescue, adoption, and ownership transfer.
          </Typography>
        </Box>

        <Box textAlign="center" marginTop={4} className="safety-assurance-box">
          <Typography variant="h4" gutterBottom>
            Your Pet's Safety is Our Priority
          </Typography>
          <CardMedia
            component="img"
            image={safetyImage}
            alt="Safety Assurance"
            style={{ maxWidth: '600px', margin: 'auto', borderRadius: '8px' }}
          />
          <Box marginTop={2}>
            <Typography variant="body1" paragraph>
              We understand how important your pet's safety is. That's why we follow stringent protocols to ensure 
              that every step we take prioritizes their well-being and security. Our team is trained in animal handling 
              and first aid, and we work closely with veterinarians to monitor the health of the pets in our care. We also educate 
              adopters and pet owners on proper pet care practices to promote long-term health and happiness for their pets.
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={4} justifyContent="center" className="grid-row">
          <Grid item xs={12} sm={4}>
            <Card className="service-card">
              <CardMedia
                component="img"
                height="180"
                image={rescueImage}
                alt="Animal Rescue"
                className="MuiCardMedia-root"
              />
              <CardContent className="service-card-content">
                <Typography variant="h6" gutterBottom>
                  Animal Rescue
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Report injured animals for rescue. We provide immediate care and rehabilitation to animals in distress.
                </Typography>
                <Button variant="contained" color="success" component={Link} to="/services" className="MuiButton-containedSuccess">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card className="service-card">
              <CardMedia
                component="img"
                height="180"
                image={adoptionImage}
                alt="Pet Adoption"
                className="MuiCardMedia-root"
              />
              <CardContent className="service-card-content">
                <Typography variant="h6" gutterBottom>
                  Pet Adoption
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Find loving homes for pets looking for a new family. We facilitate the adoption process to ensure pets find their perfect match.
                </Typography>
                <Button variant="contained" color="success" component={Link} to="/services" className="MuiButton-containedSuccess">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card className="service-card">
              <CardMedia
                component="img"
                height="180"
                image={transferImage}
                alt="Ownership Transfer"
                className="MuiCardMedia-root"
              />
              <CardContent className="service-card-content">
                <Typography variant="h6" gutterBottom>
                  Ownership Transfer
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Smoothly transfer pet ownership if you can no longer care for your pet. Our process ensures the well-being of the pet throughout the transition.
                </Typography>
                <Button variant="contained" color="success" component={Link} to="/services" className="MuiButton-containedSuccess">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} justifyContent="center" className="grid-row" style={{ marginTop: '20px' }}>
          <Grid item xs={12} sm={4}>
            <Card className="service-card">
              <CardMedia
                component="img"
                height="180"
                image={petSittingImage}
                alt="Pet Sitting"
                className="MuiCardMedia-root"
              />
              <CardContent className="service-card-content">
                <Typography variant="h6" gutterBottom>
                  Pet Sitting
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Reliable pet sitting services to care for your pets when you are away. We ensure your pets are safe and happy.
                </Typography>
                <Button variant="contained" color="success" component={Link} to="/services" className="MuiButton-containedSuccess">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card className="service-card">
              <CardMedia
                component="img"
                height="180"
                image={forumImage}
                alt="Discussion Forum"
                className="MuiCardMedia-root"
              />
              <CardContent className="service-card-content">
                <Typography variant="h6" gutterBottom>
                  Discussion Forum
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Join our community forum to discuss pet care tips, share experiences, and connect with other pet owners.
                </Typography>
                <Button variant="contained" color="success" component={Link} to="/services" className="MuiButton-containedSuccess">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export default Home;
