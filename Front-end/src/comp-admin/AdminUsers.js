import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, Table,TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, IconButton, Snackbar,
  Alert, Dialog, DialogActions, DialogContent,DialogContentText,DialogTitle,Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminHeader from './AdminHeader';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openDialog, setOpenDialog] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/Register-user/user');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8082/api/Register-user/user?id=${userIdToDelete}`);
      setUsers(users.filter(user => user.id !== userIdToDelete));
      setSnackbarMessage('User deleted successfully');
      setSnackbarSeverity('success');
    } catch (error) {
      setSnackbarMessage('Failed to delete user');
      setSnackbarSeverity('error');
    }
    setOpenSnackbar(true);
    setOpenDialog(false);
    setUserIdToDelete(null);
  };

  const handleOpenDialog = (userId) => {
    setUserIdToDelete(userId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUserIdToDelete(null);
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
        User Details
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              {/*<TableCell>Role</TableCell>*/}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
                <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.emailId}</TableCell>
                {/*<TableCell>{user.role}</TableCell>*/}
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(user.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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

export default AdminUsers;
