import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


const App = () => {

  const [users, setUsers] = useState(null);

  useEffect(() => {
    axios.get('/users')
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.error({error});
      })
  }, []);

  return (
    <div className="App">
      {users && users.map((user) => {
        return(
          <p>{user.username}: {user.id}</p>
        );
      })}
    </div>
  );
}

export default App;
