/* Se importa el método importSchema de graphql-import.
   Permite importar el archivo schema.graphql */
import { importSchema } from 'graphql-import';

const typeDefs = importSchema('data/schema.graphql');

export { typeDefs };