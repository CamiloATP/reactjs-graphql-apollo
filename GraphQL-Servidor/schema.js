import {buildSchema} from 'graphql';

const schema = buildSchema(`
    type Cliente{
        id: ID
        nombre: String
        apellido: String
        empresa: String
        email: String
        edad: Int
        tipo: tipoCliente
    }
    type Query {
        getCliente(id: ID): Cliente
    }
    enum tipoCliente{
        BASICO
        ESTADAR
        AVANZADO
    }
    input ClienteInput{
        id: ID
        nombre: String!
        apellido: String!
        empresa: String!
        email: String!
        edad: Int!
        tipo: tipoCliente
    }
    type Mutation{
        crearCliente(input: ClienteInput): Cliente
    }    
`);

// Para exportarlo a index.js
export default schema;