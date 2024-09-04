import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper, Typography, Button, TextField, makeStyles } from '@material-ui/core';
import API from './api';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
  },
}));

const MenuManagement = () => {
  const classes = useStyles();
  const { id } = useParams(); // Get restaurantId from route parameters

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // For file upload
  const [imageUrl, setImageUrl] = useState(''); // For image URL

  const handleAddMenuItem = async (e) => {
    e.preventDefault();

    // Use uploaded file if available, otherwise use the URL
    const imageToUse = image ? URL.createObjectURL(image) : imageUrl;

    const formData = {
      name,
      description,
      price,
      image: imageToUse,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await API.post(`/menus/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Menu item added successfully', response.data);
      setName('');
      setDescription('');
      setPrice('');
      setImage(null);
      setImageUrl('');
    } catch (error) {
      console.error('Failed to add menu item', error);
      console.error('Error details:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Manage Menu
      </Typography>
      <Paper className={classes.paper}>
        <Typography variant="h6">Add a New Menu Item</Typography>
        <form noValidate autoComplete="off" onSubmit={handleAddMenuItem}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Price"
            fullWidth
            margin="normal"
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          
          <TextField
            label="Image URL"
            fullWidth
            margin="normal"
            variant="outlined"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="image-upload"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
          >
            Add Menu Item
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default MenuManagement;
