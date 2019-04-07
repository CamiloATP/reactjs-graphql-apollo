import React, { Component } from 'react';

/* Se importa ApolloProvider: es el que rodea 
   todo la aplicación React para decir que vamos a utilizar Apollo*/
import { ApolloProvider } from 'react-apollo';

/* Se importa ApolloCliente: es la Configuración para Apollo  */
import ApolloClient from 'apollo-boost';

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
        <h1>Hola</h1>
      </ApolloProvider>
    );
  }
}

export default App;
