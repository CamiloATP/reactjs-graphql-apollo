import React, { Component } from 'react';

/* Se importa ApolloProvider: Es el que rodea 
   todo la aplicación React para decir que vamos a utilizar Apollo */
import { ApolloProvider } from 'react-apollo';

/* Se importa ApolloClient: Es la Configuración para Apollo  */
import ApolloClient from 'apollo-boost';

/* Componentes */
import Header from './componentes/Header';

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  onError: ({networkError, graphQLErrors}) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  }
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Header/>
      </ApolloProvider>
    );
  }
}

export default App;
