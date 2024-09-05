import React, { useState } from 'react';
import { Container, Paper, Typography, Button, TextField, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { login, register } from '../src/actions/authActions';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
    maxWidth: 400,
    margin: 'auto',
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const AuthPage = () => {
  const classes = useStyles();
  const [isRegistering, setIsRegistering] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      dispatch(register(name, email, password));
    } else {
      dispatch(login(email, password)).then(() => {
        navigate('/admin'); // Redirect to /admin after login
      });
    }
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.title}>
          {isRegistering ? 'Admin Register' : 'Admin Login'}
        </Typography>
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" className={classes.button} fullWidth>
            {isRegistering ? 'Register' : 'Login'}
          </Button>
        </form>
        <Button onClick={() => setIsRegistering(!isRegistering)} className={classes.button}>
          {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
        </Button>
      </Paper>
    </Container>
  );
};

export default AuthPage;
