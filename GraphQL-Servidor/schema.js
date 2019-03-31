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
    """ Asigna la categoría del Cliente """
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
    """ Campos para los Clientes Nuevos """
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
    """ Mutations para crear nuevos Clientes """
    type Mutation{
        #  Nombre del resolver, input con datos y valor que retorna.
        """ Te permite crear Nuevos Clientes """
        crearCliente(input: ClienteInput): Cliente
    }    
`);

// Para exportarlo a index.js
export default schema;