import React, { Fragment } from 'react';
import {Query} from 'react-apollo';
import {PEDIDOS_QUERY} from './../../queries';
import Pedido from './Pedido';

const PedidosCliente = (props) => {

    const cliente = props.match.params.id;

    // console.log(cliente);
    
    return (
        <Fragment>
            <h1 className="text-center mb-5">Pedidos Cliente</h1>
            <div className="row">
                <Query query={PEDIDOS_QUERY} variables={{cliente}} pollInterval={500}>
                    {({loading, error, data, startPolling, stopPolling}) => {
                        if(loading) return(
                            <div className="sk-cube-grid">
                                <div className="sk-cube sk-cube1"></div>
                                <div className="sk-cube sk-cube2"></div>
                                <div className="sk-cube sk-cube3"></div>
                                <div className="sk-cube sk-cube4"></div>
                                <div className="sk-cube sk-cube5"></div>
                                <div className="sk-cube sk-cube6"></div>
                                <div className="sk-cube sk-cube7"></div>
                                <div className="sk-cube sk-cube8"></div>
                                <div className="sk-cube sk-cube9"></div>
                            </div>
                        );

                        if(error) return `Error ${error.message}`;

                        console.log(data);

                        return (
                            data.getPedidos.map(pedido => (
                                <Pedido
                                    key={pedido.id}
                                    pedido={pedido}
                                    cliente={cliente}
                                />
                            ))
                        );
                    }}
                </Query>
            </div>
        </Fragment>
    );
}
 
export default PedidosCliente;