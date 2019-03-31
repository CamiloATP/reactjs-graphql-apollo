import {buildSchema} from 'graphql';

const schema = buildSchema(`
    type Cliente{
        id: ID
        nombre: String
        apellido: String
        empresa: String
        emails: [Email]
        edad: Int
        tipo: tipoCliente
        pedidos: [Pedido]
    }
    type Pedido{
        producto: String
        precio: Int
    }
    type Email{
        email: String
    }
    type Query {
        getCliente(id: ID): Cliente
    }
    enum tipoCliente{
        BASICO
        ESTADAR
        AVANZADO
    }
    input EmailInput{
        email: String
    }
    input PedidoInput{
        producto: String
        precio: Int
    }
    input ClienteInput{
        id: ID
        nombre: String!
        apellido: String!
        empresa: String!
        emails: [EmailInput]
        edad: Int!
        tipo: tipoCliente
        pedidos: [PedidoInput]
    }
    type Mutation{
        crearCliente(input: ClienteInput): Cliente
    }    
`);

// Para exportarlo a index.js
export default schema;