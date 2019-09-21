import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {RootSession} from './App';
import * as serviceWorker from './serviceWorker';

/* 
	Se importa ApolloProvider: Es el que rodea todo la aplicación 
  	React para decir que vamos a utilizar ApolloProvider */
import { ApolloProvider } from 'react-apollo';

/* 
    Se importa ApolloClient: Es la Configuración para Apollo 
    desde la conexión proyecto ./servidor */
import ApolloClient, { InMemoryCache } from 'apollo-boost';

// Se crea una nueva instacia
const client = new ApolloClient({
	/* 
		URI del servidor de GraphQL, donde se encuentran los 
		resolver y conexión a la bd */
	uri: "http://localhost:8000/graphql",
	fetchOptions: {  // <-- Enviar Token al servidor
		credentials: 'include'
	},
	request: operation => { // <-- Se ejecuta en cada página si se obtiene un token valido
		const token = localStorage.getItem('token');
		operation.setContext({
			headers: {
				authorization: token
			}
		});
	},
	cache: new InMemoryCache({
		addTypename: false
	}),
	onError: ({networkError, graphQLErrors}) => {
		console.log('graphQLErrors', graphQLErrors);
		console.log('networkError', networkError);
	}
});

ReactDOM.render(
    /* 
        ApolloProvider, pasandole la instacia de ApolloClient 
        de donde se obtienen los datos de GraphQL */
    <ApolloProvider client={client}>
        {/* Apollo Provider rodea todos los componentes de la aplicación */}
        <RootSession />
    </ApolloProvider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
