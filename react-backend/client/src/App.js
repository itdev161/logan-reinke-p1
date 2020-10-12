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
    minHeight: 260,
    minWidth: 214,
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
  error: {
    color: "red",
    fontWeight: "bold",
  },
}));

const App = () => {
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authorization, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    if(user) {
      setAuth(true);
      setLoading(false);
    }
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);
    axios.get(`/users`)
      .then((response) => {
        let userFound = (response?.data.filter((user) => user?.username === username && user?.password === password
        ))
        if (userFound.length > 0){
          console.log({response})
          setUser(userFound);
        } else if(response?.status === 200 && userFound.length <= 0) {
          console.log({response})
          setLoading(false);
          setError(true);
        }
      })
      .catch((error) => {
        console.error({error});
      })
  }

  console.log({user})
  console.log({authorization})

  return (
    <div className="App">
    <div className={classes.root}>
    <div className={classes.formContainer}>
    {!authorization && 
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
        <>
          {error ? <Typography classes={{root: classes.error}}>Incorrect username or password.</Typography> : null}
        </>
          {loading
          ? <Grid item>
              <img src="/images/25.gif" />
            </Grid>
          : <><Grid item>
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
          </Grid></>}
          <Grid item>
          <Button color="primary" variant="contained" onClick={() => handleSubmit()} disabled={Boolean(loading)}>
            SUBMIT
          </Button>
          </Grid>
        </Grid>
      </Paper>
      ||
      <Typography>Welcome {user[0]?.username}!</Typography>
    }
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
