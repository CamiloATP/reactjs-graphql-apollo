import React, { Component, Fragment } from 'react';

/* 
	Se importa ApolloProvider: Es el que rodea todo la aplicación 
  	React para decir que vamos a utilizar Apollo(Proveedor) */
import { ApolloProvider } from 'react-apollo';

/* 
	Se importa ApolloClient: Es la Configuración para Apollo 
	desde la conexión proyecto ./servidor */
import ApolloClient, { InMemoryCache } from 'apollo-boost';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 

/* Componentes Header(Menu) del html */
import Header from './componentes/Header';
import Clientes from './componentes/Clientes';
import NuevoCliente from './componentes/NuevoCliente';
import EditarCliente from './componentes/EditarCliente';

// Se crea una nueva instacia
const client = new ApolloClient({
	/* 
		URI del servidor de GraphQL, donde se encuentran los 
		resolver y conexión a la bd */
	uri: "http://localhost:8000/graphql",
	cache: new InMemoryCache({
		addTypename: false
	}),
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
				<Router>
					<Fragment>
						<Header/>
						<div className="container">
							<Switch>
								<Route exact path="/" component={Clientes} />
								<Route exact path="/cliente/nuevo" component={NuevoCliente} />
								<Route exact path="/cliente/editar/:id" component={EditarCliente} />
							</Switch>
						</div>
					</Fragment>	
				</Router>	
			</ApolloProvider>
		);
	}
}

export default App;
