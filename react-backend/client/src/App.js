import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  formContainer: {
    width: "fit-content",
  },
}));

const App = () => {
  const [users, setUsers] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authorization, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    axios.get('/users')
      .then((response) => {
        setUsers(response?.data)
        console.log({response})
      })
      .catch((error) => {
        console.error({error});
      })
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    axios.get('/users', {
      username: username,
      password: password,
    })
  }

  console.log({username})
  console.log({password})
  console.log({users})


  return (
    <div className="App">
    <div className={classes.root}>
    <div className={classes.formContainer}>
    <Paper
      classes={{
        root: classes.paper,
      }}
    >
    <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
    <Grid item>
      <Typography variant="h3" component="h1">
        Login
      </Typography>
    </Grid>
      <Grid item>
        <TextField
          label="Username"
          onChange={(event) => setUsername(event.target.value)}>
        </TextField>
      </Grid>
      <Grid item>
        <TextField 
          label="Password"
          onChange={(event) => setPassword(event.target.value)}>
        </TextField>
      </Grid>
      <Grid item>
      <Button color="primary" variant="contained" onClick={() => handleSubmit()}>
        SUBMIT
      </Button>
      </Grid>
    </Grid>
    </Paper>
    </div>
    </div>
      {users && users.map((user) => {
        return(
          <p>{user.username}: {user.id}, {user.password}</p>
        );
      })}
    </div>
  );
}

export default App;
