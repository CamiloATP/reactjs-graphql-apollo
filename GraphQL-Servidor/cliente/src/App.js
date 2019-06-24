import React, { Component } from 'react';

/* 
	Se importa ApolloProvider: Es el que rodea todo la aplicación 
  	React para decir que vamos a utilizar Apollo(Proveedor) */
import { ApolloProvider } from 'react-apollo';

/* 
	Se importa ApolloClient: Es la Configuración para Apollo 
	desde la conexión proyecto ./servidor */
import ApolloClient from 'apollo-boost';

/* Componentes Header(Menu) del html */
import Header from './componentes/Header';

import Clientes from './componentes/Clientes';

// Se crea una nueva instacia
const client = new ApolloClient({
	/* 
		URI del servidor de GraphQL, donde se encuentran los 
		resolver y conexión a la bd */
	uri: "http://localhost:8000/graphql",
	onError: ({networkError, graphQLErrors}) => {
		console.log('graphQLErrors', graphQLErrors);
		console.log('networkError', networkError);
	}
});

class App extends Component {
	render() {
		return (
			/* 
				ApolloProvider, pasandole la instacia de ApolloClient 
				de donde se obtienen los datos de GraphQL */
			<ApolloProvider client={client}>
				{/* Apollo Provider rodea todos los componentes de la aplicación */}
				<Header/>
				<div className="container">
					<Clientes/>
				</div>
			</ApolloProvider>
		);
	}
}

export default App;
