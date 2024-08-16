import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid, Button, CircularProgress } from '@mui/material';
import AdminHeader from './AdminHeader';

const AdminRescue = () => {
  const [rescues, setRescues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRescues = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/Rescue');
        setRescues(response.data);
      } catch (error) {
        console.error('Error fetching rescue reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRescues();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AdminHeader />
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom className="services-heading">
          Rescue Reports
        </Typography>
        {rescues.length === 0 ? 
        (
          <Typography variant="h6" gutterBottom>
            No rescue reports available
          </Typography>
        ) 
        : 
        (
          <Grid container spacing={3}>
            {rescues.map((rescue) => (
              <Grid item xs={12} sm={6} md={4} key={rescue.id}>
                <Card>
                  <CardContent className="card-content">
                    
                    {rescue.image && (
                      <img
                        src={`data:image/jpeg;base64,${rescue.image}`}
                        alt="Rescue"
                        style={{ width: '100%', height: 'auto', marginTop: '16px' }}
                      />
                    )}

                    <Typography color="text.secondary">
                      Location: {rescue.location}
                    </Typography>

                    <Typography color="text.secondary">
                      Description: {rescue.description}
                    </Typography>

                    <Typography color="text.secondary">
                      Reported by:{rescue.name}
                    </Typography>
                    
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

export default AdminRescue;
