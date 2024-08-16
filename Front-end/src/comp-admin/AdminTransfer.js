import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid, Button, CircularProgress } from '@mui/material';
import AdminHeader from './AdminHeader';
import './AdminTransfer.css'; // Make sure to import your CSS file

const AdminTransfer = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/Ownership-Transfer/All');
        setTransfers(response.data);
      } catch (error) {
        console.error('Error fetching transfers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransfers();
  }, []);

  const toggleExpanded = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AdminHeader />
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom className="services-heading">
          Ownership Transfer Requests
        </Typography>
        {transfers.length === 0 ? (
          <Typography variant="h6" gutterBottom>
            No transfer requests have been made.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {transfers.map((transfer) => (
              <Grid item xs={12} sm={6} md={4} key={transfer.id}>
                <Card>
                  <CardContent className={`card-content ${expanded[transfer.id] ? 'expanded' : ''}`}>
                    <Typography variant="h5" component="div">
                      {transfer.petName}
                    </Typography>
                    <Typography color="text.secondary">
                      Owner Name: {transfer.ownerName}
                    </Typography>
                    <Typography color="text.secondary">
                      Pet Breed: {transfer.petBreed}
                    </Typography>
                    {expanded[transfer.id] && (
                      <>
                        <Typography color="text.secondary">
                          Owner Phone: {transfer.ownerPhone}
                        </Typography>
                        <Typography color="text.secondary">
                          Owner Email: {transfer.ownerEmail}
                        </Typography>
                        <Typography color="text.secondary">
                          Pet Age: {transfer.petAge}
                        </Typography>
                        <Typography color="text.secondary">
                          Description: {transfer.description}
                        </Typography>
                        {transfer.image && (
                          <img src={`data:image/jpeg;base64,${transfer.image}`} alt="Pet" className="pet-image" />
                        )}
                      </>
                    )}
                    <Button
                      variant="outlined"
                      onClick={() => toggleExpanded(transfer.id)}
                      className="view-button"
                    >
                      {expanded[transfer.id] ? 'Hide' : 'View'}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default AdminTransfer;
