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

export const PRODUCTOS_QUERY = gql`
    query getProductos($limit: Int, $offset: Int, $stock: Boolean){
        getProductos(limit: $limit, offset: $offset, stock: $stock){
            id
            nombre
            precio
            stock
        }
        totalProductos
    }
`;

export const PRODUCTO_QUERY = gql`
    query getProducto($id: ID){
        getProducto(id: $id){
            nombre
            precio
            stock
        }
    }
`;

export const PEDIDOS_QUERY = gql`
    query getPedidos($cliente: ID){
        getPedidos(cliente: $cliente){
            id
            fecha
            estado
            total
            cliente
            pedido{
                id
                cantidad
            }
        }
    }
`;

export const TOP_CLIENTES = gql`
    query topClientes{
        topClientes{
            total
            cliente{
                nombre
            }
        }
    }
`;
