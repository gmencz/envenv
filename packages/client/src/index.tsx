import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { GlobalStyle } from './utils/global-styles';
import { App } from './app';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apollo-client';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('envenv-root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
