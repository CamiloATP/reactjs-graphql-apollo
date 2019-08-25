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
import Header from './componentes/Layout/Header';
import Clientes from './componentes/Clientes/Clientes';
import NuevoCliente from './componentes/Clientes/NuevoCliente';
import EditarCliente from './componentes/Clientes/EditarCliente';

import NuevoProducto from './componentes/Productos/NuevoProducto';
import Productos from './componentes/Productos/Productos'
import EditarProducto from './componentes/Productos/EditarProducto';

import NuevoPedido from './componentes/Pedidos/NuevoPedido';

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
								<Route exact path="/clientes" component={Clientes} />
								<Route exact path="/clientes/nuevo" component={NuevoCliente} />
								<Route exact path="/clientes/editar/:id" component={EditarCliente} />
								<Route exact path="/productos" component={Productos} />
								<Route exact path="/productos/nuevo" component={NuevoProducto} />
								<Route exact path="/productos/editar/:id" component={EditarProducto} />
								<Route exact path="/pedidos/nuevo/:id" component={NuevoPedido} />
							</Switch>
						</div>
					</Fragment>	
				</Router>	
			</ApolloProvider>
		);
	}
}

export default App;
