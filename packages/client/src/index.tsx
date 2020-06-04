import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyle } from './utils/global-styles';
import { App } from './App';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { client } from './utils/apollo-client';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Router>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('envenv-root')
);
