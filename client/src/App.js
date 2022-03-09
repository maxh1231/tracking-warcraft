import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';

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

          {/* <Route exact path="/" element={} /> */}
          {/* <Route exact path="/" element={} /> */}
          {/* <Route exact path="/" element={} /> */}
          {/* <Route exact path="/" element={} /> */}

        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
