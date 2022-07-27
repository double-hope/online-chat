import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import {ApolloClient, InMemoryCache, HttpLink, split, ApolloProvider} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { typeDefs } from './typeDefs';
import {BrowserRouter} from "react-router-dom";

const httpLink = new HttpLink({
    uri: 'http://127.0.0.1:4000/graphql',
});

const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:4000/graphql',
}));

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    typeDefs,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <ApolloProvider client={client}>
              <App />
          </ApolloProvider>
      </BrowserRouter>
  </React.StrictMode>
);

