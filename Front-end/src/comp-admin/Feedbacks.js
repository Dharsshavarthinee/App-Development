import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import AdminHeader from './AdminHeader';

const Feedback = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [minimized, setMinimized] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/contacts');
        setContacts(response.data.reverse());
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch contact data');
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleMinimize = (id) => {
    setMinimized((prevMinimized) =>
      prevMinimized.includes(id)
        ? prevMinimized.filter((contactId) => contactId !== id)
        : [...prevMinimized, id]
    );
  };

  if (loading) {
    return (
      <>
        <AdminHeader />
        <Container>
          <CircularProgress />
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <AdminHeader />
        <Container>
          <Typography color="error">{error}</Typography>
        </Container>
      </>
    );
  }

  return (
    <div>
      <AdminHeader />
      <Container>
        <Typography variant="h4" gutterBottom>
          Feedbacks
        </Typography>
        <Grid container spacing={3}>
          {contacts.map((contact) => (
            <Grid item key={contact.id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" style={{ fontSize: '1.25rem' }}>{contact.name}</Typography>
                  <Typography color="textSecondary" style={{ fontSize: '1rem' }}>{contact.email}</Typography>
                  {!minimized.includes(contact.id) && (
                    <Typography variant="body2" style={{ fontSize: '1rem' }}>
                      {contact.message}
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleMinimize(contact.id)}>
                    {minimized.includes(contact.id) ? 'View' : 'Hide'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default Feedback;
