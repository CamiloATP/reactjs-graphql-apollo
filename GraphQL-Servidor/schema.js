import {buildSchema} from 'graphql';

const schema = buildSchema(`
    type Cliente{
        id: ID
        nombre: String
        apellido: String
        empresa: String
        email: String
        edad: Int
    }
    type Query {
        getCliente(id: ID): Cliente
    }
    input ClienteInput{
        id: ID
        nombre: String!
        apellido: String!
        empresa: String!
        email: String!
        edad: Int!
    }
    type Mutation{
        crearCliente(input: ClienteInput): Cliente
    }    
`);

// Para exportarlo a index.js
export default schema;