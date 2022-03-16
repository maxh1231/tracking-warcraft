
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';


import Home from './pages/Home';
import SearchResults from './pages/SearchResults'
import GuildPage from './pages/GuildPage'
import CharacterPage from './pages/CharacterPage'

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



  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route exact path="/search-results/:name" element={<SearchResults />} />
          <Route exact path="/guild/:region/:realm/:name" element={<GuildPage />} />
          <Route exact path="/character/:region/:realm/:name" element={<CharacterPage />} />

        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
