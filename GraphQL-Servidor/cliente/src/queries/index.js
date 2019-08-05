import gql from "graphql-tag";

export const CLIENTES_QUERY = gql`
{
    getClientes{
        id
        nombre
        apellido
        empresa
    }
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

