import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid, Button, Checkbox, FormControlLabel, CircularProgress } from '@mui/material';
import AdminHeader from './AdminHeader';
import './AdminAdopt.css';

const AdminAdopt = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkboxLoading, setCheckboxLoading] = useState({});
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const response = await axios.get('http://localhost:8082/Adopt');
        setAdoptions(response.data);
      } catch (error) {
        console.error('Error fetching adoptions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdoptions();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    setCheckboxLoading((prev) => ({ ...prev, [id]: true }));
    try {
      await axios.put(`http://localhost:8082/Adopt/${id}/status`, null, {
        params: {
          status: status
        }
      });
      setAdoptions((prevAdoptions) =>
        prevAdoptions.map((adopt) =>
          adopt.id === id ? { ...adopt, status: status } : adopt
        )
      );
    } catch (error) {
      console.error('Error updating adoption status:', error);
    } finally {
      setCheckboxLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

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
          Adoption Requests
        </Typography>
        {adoptions.length === 0 ? (
          <Typography variant="h6" gutterBottom>
            Adoption request yet to be made
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {adoptions.map((adopt) => (
              <Grid item xs={12} sm={6} md={4} key={adopt.id}>
                <Card>
                  <CardContent className={`card-content ${expanded[adopt.id] ? 'expanded' : ''}`}>
                    <Typography variant="h5" component="div">
                      {adopt.name}
                    </Typography>
                    <Typography color="text.secondary">
                      Preferred Pet ID: {adopt.preferredPetId}
                    </Typography>
                    <Typography variant="h6" className={`status ${adopt.status.toLowerCase()}`}>
                      Status: {adopt.status}
                    </Typography>
                    {expanded[adopt.id] && (
                      <>
                        <Typography color="text.secondary">
                          Phone: {adopt.phoneNo}
                        </Typography>
                        <Typography color="text.secondary">
                          Email: {adopt.email}
                        </Typography>
                        <Typography color="text.secondary">
                          Address: {adopt.address}
                        </Typography>
                        <Typography color="text.secondary">
                          Reason: {adopt.reason}
                        </Typography>
                        <FormControlLabel
                          control={
                            checkboxLoading[adopt.id] ? (
                              <CircularProgress size={24} />
                            ) : (
                              <Checkbox
                                checked={adopt.status === 'Verified'}
                                onChange={() => handleStatusUpdate(adopt.id, 'Verified')}
                                disabled={adopt.status === 'Adopted' || adopt.status === 'Verified'}
                              />
                            )
                          }
                          label="Verified"
                          className="form-control-label"
                        />
                        {adopt.status === 'Verified' && (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleStatusUpdate(adopt.id, 'Adopted')}
                            className="proceed-button"
                          >
                            Successfully Adopted!
                          </Button>
                        )}
                      </>
                    )}
                    <Button
                      variant="outlined"
                      onClick={() => toggleExpanded(adopt.id)}
                      className="view-button"
                    >
                      {expanded[adopt.id] ? 'Hide' : 'View'}
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

export default AdminAdopt;
