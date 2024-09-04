import React, { useState } from 'react';
import AuthForm from '../components/Auth/AuthForm';
import { Container, Paper, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  paper: {
    padding: theme.spacing(4),
    maxWidth: '400px',
    width: '100%',
  },
  toggleText: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
    cursor: 'pointer',
    color: theme.palette.primary.main,
  },
}));

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const classes = useStyles();

  const handleToggle = () => {
    setIsRegistering((prev) => !prev);
  };

  return (
    <Container className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        {/* <Typography variant="h4" align="center">
          {isRegistering ? 'Register' : 'Login'}
        </Typography> */}
        <AuthForm isRegistering={isRegistering} />
        <Typography
          variant="body2"
          className={classes.toggleText}
          onClick={handleToggle}
        >
          {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
        </Typography>
      </Paper>
    </Container>
  );
};

export default AuthPage;
