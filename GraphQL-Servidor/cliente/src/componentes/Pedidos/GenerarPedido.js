import React from 'react';
import {Mutation} from 'react-apollo';
import {NUEVO_PEDIDO} from './../../mutations';
import {withRouter} from 'react-router-dom';


const validarPedido = (props) => {
    let valido = !props.productos || props.total <= 0;

    return valido;
}

const GenerarPedido = (props) => {
    return (
        <Mutation
            mutation={NUEVO_PEDIDO}
            onCompleted={() => props.history.push('/clientes')}
        >
            {nuevoPedido => (
                <button
                    disabled={validarPedido(props)}
                    type="button"
                    className="btn btn-warning mt-4"
                    onClick={e => {
                        const productosInput = props.productos.map(({nombre, precio, stock, ...objeto}) => objeto);

                        // console.log(productosInput);

                        const input = {
                            pedido: productosInput,
                            total: props.total,
                            cliente: props.id_cliente,
                            vendedor: props.idVendedor
                        };
                        
                        // console.log(input);

                        nuevoPedido({
                            variables: {input}
                        });
                    }}
                >
                        Generar Pedido
                </button>
            )}
        </Mutation>
    );
}
 
export default withRouter(GenerarPedido);