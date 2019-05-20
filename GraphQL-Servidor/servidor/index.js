// Se importa express | <-- Estilo Typescript
import express from 'express';

// Se importa Apollo Server para Express
import { ApolloServer } from 'apollo-server-express';

// Se importa los typeDefs
import { typeDefs } from './data/schema';

// Se importa los resolvers
import { resolvers } from './data/resolvers';

/////////////////////////////////////////////////////////////////////
// Express es una infraestructura Web de direccionamiento y        //
// middleware que tiene una funcionalidad mínima propia: una       //
// aplicación Express es fundamentalmente una serie de llamadas a  //
// funciones de middleware.                                        //
/////////////////////////////////////////////////////////////////////
// Se crear una constante del objeto express
const app = express();

// Se crea una nueva instacia de Apollo server
const server = new ApolloServer({typeDefs, resolvers});

server.applyMiddleware({app});

// Escuchando por el puerto 8000 las peticiones
app.listen({port: 8000}, () => console.log(`Escuchando por el puerto 8000 http://localhost:8000${server.graphqlPath}`));