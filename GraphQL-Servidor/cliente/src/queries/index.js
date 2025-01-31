import gql from "graphql-tag";

export const CLIENTES_QUERY = gql`
    query getClientes($limite: Int, $offset: Int, $vendedor: String){
        getClientes(limit: $limite, offset: $offset, vendedor: $vendedor){
            id
            nombre
            apellido
            empresa
        }
        totalClientes(vendedor: $vendedor)
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

export const TOP_VENDEDORES = gql`
    query topVendedores{
        topVendedores{
            total
            vendedor{
                nombre
            }
        }
    }
`;

export const USUARIO_ACTUAL = gql`
    query getUsuario{
        getUsuario{
            id
            usuario
            nombre
            rol
        }
    }
`;