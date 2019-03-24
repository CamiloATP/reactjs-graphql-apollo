import {buildSchema} from 'graphql';

const schema = buildSchema(`
    type Cliente{
        id: ID
        nombre: String
        apellido: String
        empresa: String
        email: String
    }
    type Query {
        cliente: Cliente
    }
`);

// Para exportarlo a index.js
export default schema;