import gql from 'graphql-tag';

export const NUEVO_CLIENTE = gql`
    mutation crearCliente($input: ClienteInput){
        crearCliente(input: $input) {
            id
            nombre
            apellido
        }
    }
`;

export const ACTUALIZAR_CLIENTE = gql`
    mutation actualizarCliente($input: ClienteInput){
        actualizarCliente(input: $input){
            id
            nombre
            apellido
            edad
            empresa
            emails{
                email
            }
            tipo
        }
    }
`;

export const ELIMINAR_CLIENTE = gql`
    mutation actualizarCliente($id: ID!){
        eliminarCliente(id: $id)
    }
`;