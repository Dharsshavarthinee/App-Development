import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Button, TextField, Paper, CircularProgress, Alert, IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ThumbUp, Delete } from '@mui/icons-material';
import Layout from '../components/Layout.js';
import '../styles/Forum.css';

const CustomButton = styled(Button)({
  backgroundColor: '#004d40',
  color: 'white',
  '&:hover': {
    backgroundColor: '#00332c',
  },
});

const Forum = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userName, setUserName] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const newPost = {
      title,
      content,
      userName,
      date: new Date().toLocaleString(),
      image: image ? URL.createObjectURL(image) : null,
      likes: 0,
    };

    try {
      // Simulate saving the post
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setPosts([newPost, ...posts]);
      setSuccess('Post submitted successfully!');
      setTitle('');
      setContent('');
      setUserName('');
      setImage(null);
    } catch (err) {
      setError('Failed to submit post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
  };

  const handleLike = (index) => {
    const updatedPosts = posts.map((post, i) => 
      i === index ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  return (
    <Layout>
      <Container maxWidth="md" className="forum-container">
        <Paper elevation={3} className="forum-paper">
          <Box textAlign="center" marginBottom={4}>
            <Typography variant="h3" gutterBottom className="forum-heading">
              Pet Care, Rescue, and Adoption Forum
            </Typography>
            <Typography variant="body1" paragraph>
              Share your experiences, tips, and ask questions about pet care, rescue, and adoption.
            </Typography>
          </Box>

          <Box className="form-section">
            <Typography variant="h4" gutterBottom>
              Create a New Post
            </Typography>
            <Box className="form-container">
              <form className="post-form" onSubmit={handleSubmit}>
                <TextField
                  label="Your Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  color="success"
                  value={userName}
                  onChange={handleUserNameChange}
                />
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  color="success"
                  value={title}
                  onChange={handleTitleChange}
                />
                <TextField
                  label="Content"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  multiline
                  rows={4}
                  color="success"
                  value={content}
                  onChange={handleContentChange}
                />
                <input
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange}
                  style={{ marginTop: 20, marginBottom: 20 }}
                />

                <Box textAlign="center" marginTop={2}>
                  {loading ? (
                    <CircularProgress color="success" />
                  ) : (
                    <CustomButton variant="contained" type="submit">
                      Submit Post
                    </CustomButton>
                  )}
                </Box>

                {error && <Alert severity="error" marginTop={2}>{error}</Alert>}
                {success && <Alert severity="success" marginTop={2}>{success}</Alert>}
              </form>
            </Box>
          </Box>

          <Box className="posts-section">
            <Typography variant="h4" gutterBottom>
              Recent Posts
            </Typography>
            {posts.length === 0 ? (
              <Typography variant="body1">No posts yet. Be the first to share!</Typography>
            ) : (
              posts.map((post, index) => (
                <Paper key={index} elevation={1} className="post">
                  <Typography variant="h5">{post.title}</Typography>
                  <Typography variant="body2" color="textSecondary">{post.date} by {post.userName}</Typography>
                  {post.image && <img src={post.image} alt="Post" className="post-image" />}
                  <Typography variant="body1" paragraph>{post.content}</Typography>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <IconButton color="success" onClick={() => handleLike(index)}>
                      <ThumbUp /> {post.likes}
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(index)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </Paper>
              ))
            )}
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
}

export default Forum;
