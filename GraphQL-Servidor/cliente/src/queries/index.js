import gql from "graphql-tag";

export const CLIENTES_QUERY = gql`
    query getClientes($limite: Int, $offset: Int){
        getClientes(limit: $limite, offset: $offset){
            id
            nombre
            apellido
            empresa
        }
        totalClientes
    }
`;

export const CLIENTE_QUERY = gql`
    query consultarCliente($id: ID){
        getCliente(id: $id){
            nombre
            apellido
            edad
            empresa
            tipo
            emails{
                email
            }
        }        
    }
`;

