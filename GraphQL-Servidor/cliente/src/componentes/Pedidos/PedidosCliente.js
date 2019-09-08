import React, { Fragment } from 'react'

const PedidosCliente = (props) => {

    const id_cliente = props.match.params.id;

    console.log(id_cliente);
    
    return (
        <Fragment>
            <h1 className="text-center mb-5">Pedidos Cliente</h1>
            <div className="row">
                <p>Pedidos</p>
            </div>
        </Fragment>
    );
}
 
export default PedidosCliente;