import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../../actions/authActions';
import { TextField, Button, Typography, Container, Paper, makeStyles, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    width: '100%',
    maxWidth: '400px',
  },
  form: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  errorText: {
    color: theme.palette.error.main,
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  switchText: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
    cursor: 'pointer',
    color: theme.palette.primary.main,
  },
}));

const AuthForm = ({ isRegistering }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    // Basic validation
    if (isRegistering && !name.trim()) {
      setError('Name is required');
      return;
    }
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    if (isRegistering) {
      dispatch(register(name, email, password));
    } else {
      dispatch(login(email, password));
    }
  };

  useEffect(() => {
    if (auth.token) {
      navigate('/home');
    }
  }, [auth.token, navigate]);

  useEffect(() => {
    if (auth.error) {
      setError(auth.error);
    }
  }, [auth.error]);

  return (
    <Container className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h5" align="center">
          {isRegistering ? 'Register' : 'Login'}
        </Typography>
        <form onSubmit={submitHandler} className={classes.form} noValidate>
          {isRegistering && (
            <TextField
              variant="outlined"
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!error}
              helperText={error}
              required
            />
          )}
          <TextField
            variant="outlined"
            label="Email"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error}
            required
          />
          <TextField
            variant="outlined"
            label="Password"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
            helperText={error}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submitButton}
            disabled={auth.loading}
          >
            {auth.loading ? <CircularProgress size={24} /> : isRegistering ? 'Register' : 'Login'}
          </Button>
          {error && (
            <Typography variant="body2" className={classes.errorText}>
              {error}
            </Typography>
          )}
        </form>
        <Typography
          variant="body2"
          className={classes.switchText}
          onClick={() => {
            setError('');
            navigate(isRegistering ? '/login' : '/register');
          }}
        >
          {/* {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"} */}
        </Typography>
      </Paper>
    </Container>
  );
};

export default AuthForm;
