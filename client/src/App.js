
import React, { useCallback, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';

import Nav from './components/Nav';


import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import SearchResults from './pages/SearchResults'
import GuildPage from './pages/GuildPage'
import CharacterPage from './pages/CharacterPage'
import Login from './pages/Login';
import Logout from './pages/Logout';
import Signup from './pages/Signup';

const uploadLink = createUploadLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, uploadLink]),
  cache: new InMemoryCache(),
});

function App() {
  const [user, setUser] = useState('');

  const wrapperSetUser = useCallback(val => {
    setUser(val);
  }, [setUser]);

  const getUser = async () => {
    const response = await fetch('/auth/user');
    const data = await response.json();
    if (data.message) {
      setUser(null);
    } else {
      setUser(data);
    };
  };

  useEffect(() => {
    if (localStorage.getItem('warcraftID')) {
      setUser(localStorage.getItem('warcraftID'));
    } else {
      getUser();
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <Router>
        <Nav />
        <Routes>

          <Route exact path="/" element={<Home />} />
<<<<<<< HEAD
          <Route exact path="/leaderboards" element={<Leaderboard />} />
=======
          <Route path="/:code" element={<Home />} />
>>>>>>> 72441c34761ea5d581d8b20d7e0ab06013f549e8
          <Route exact path="/search-results/:name" element={<SearchResults />} />
          <Route exact path="/guild/:region/:realm/:name" element={<GuildPage />} />
          <Route exact path="/character/:region/:realm/:name" element={<CharacterPage />} />
          <Route exact path="/login" element={<Login user={user} setUser={wrapperSetUser} />} />
          <Route exact path="/signup" element={<Signup setUser={wrapperSetUser} />} />
          <Route exact path="/logout" element={<Logout setUser={wrapperSetUser} />} />
          
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
