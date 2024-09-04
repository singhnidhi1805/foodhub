import React, { useState } from 'react';
import API from '../../api';
import {
  TextField,
  Button,
  InputAdornment,
  Container,
  makeStyles,
  Snackbar,
  IconButton,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
// import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(4),
    gap: theme.spacing(2),
  },
  input: {
    flexGrow: 1,
  },
  button: {
    height: '56px', // Match the height of the TextField for better alignment
  },
}));

const SearchBar = ({ setSearchResults }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const classes = useStyles();

  const handleSearch = async () => {
    if (query.trim() === '') {
      setError('Please enter a search query.');
      setShowSnackbar(true);
      return;
    }

    try {
      const { data } = await API.get(`/restaurants/search?query=${query}`);
      setSearchResults(data);
    } catch (err) {
      setError('Failed to fetch search results. Please try again.');
      setShowSnackbar(true);
    }
  };

  return (
    <Container className={classes.container}>
      <TextField
        variant="outlined"
        placeholder="Search for dishes, cuisines, or restaurants"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={classes.input}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        className={classes.button}
        startIcon={<SearchIcon />}
      >
        Search
      </Button>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
      >
        {/* <Alert onClose={() => setShowSnackbar(false)} severity="error">
          {error}
        </Alert> */}
      </Snackbar>
    </Container>
  );
};

export default SearchBar;
