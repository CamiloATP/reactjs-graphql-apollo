// Se importa express | <-- Estilo Typescript
import express from 'express';

// Se importa Apollo Server para Express
import { ApolloServer } from 'apollo-server-express';

// Se importa los typeDefs
import { typeDefs } from './data/schema';

// Se importa los resolvers
import { resolvers } from './data/resolvers';

import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({path: 'variables.env'});

/////////////////////////////////////////////////////////////////////
// Express es una infraestructura Web de direccionamiento y        //
// middleware que tiene una funcionalidad mínima propia: una       //
// aplicación Express es fundamentalmente una serie de llamadas a  //
// funciones de middleware.                                        //
/////////////////////////////////////////////////////////////////////
// Se crear una constante del objeto express
const app = express();

// Se crea una nueva instacia de Apollo server
const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: async({req}) => {
        // Obtener el token del servidor
        const token = req.headers['authorization'];

        if(token !== 'null')
        {
            try {
                // Verificar el token del frontend Cliente
                const usuarioActual = await jwt.verify(token, process.env.SECRETO);

                // Agregamos el usuario actual al request
                req.usuarioActual = usuarioActual;

                return {
                    usuarioActual
                }

            } catch (error) {
                console.error(error);
            }
        }

        console.log(token);
    }
});

server.applyMiddleware({app});

// Escuchando por el puerto 8000 las peticiones
app.listen({port: 8000}, () => console.log(`Escuchando por el puerto 8000 http://localhost:8000${server.graphqlPath}`));