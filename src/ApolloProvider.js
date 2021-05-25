import React from 'react';
import App from './App';

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://snack-vending-machine-back.herokuapp.com/',
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Category: {
        fields: {
          id: {
            merge: true,
          },
        },
      },
    },
  }),
  link: httpLink,
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
