import React from 'react';
import { Container, Typography, Link, Box } from '@mui/material';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Box textAlign="center" padding={2}>
          <Typography variant="body1" color="textSecondary">
            &copy; 2024 Pet Care. All rights reserved.
          </Typography>
          <Box marginTop={1}>
            <Link href="#privacy-policy" color="inherit" className="footer-link">
              Privacy Policy
            </Link>
            {' | '}
            <Link href="#terms-of-service" color="inherit" className="footer-link">
              Terms of Service
            </Link>
            {' | '}
            <Link href="/contact" color="inherit" className="footer-link">
              Contact Us
            </Link>
          </Box>
        </Box>
      </Container>
    </footer>
  );
}

export default Footer;
