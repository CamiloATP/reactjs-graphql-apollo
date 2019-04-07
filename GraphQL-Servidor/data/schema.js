// Se importa los resolvers
import { resolvers } from './resolvers';

/* Se importa el método importSchema de graphql-import.
   Permite importar el archivo schema.graphql */
import { importSchema } from 'graphql-import';

// Se importa el método makeExecutableSchema de graphql-tools
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = importSchema('data/schema.graphql');

const schema = makeExecutableSchema({typeDefs, resolvers});

export { schema };