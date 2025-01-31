import React, { Component, Fragment } from 'react';
import DatosCliente from './DatosCliente';
import {Query} from 'react-apollo';
import {PRODUCTOS_QUERY} from '../../queries'
import ContenidoPedido from './ContenidoPedido';
import '../../spinner.css';
import {withRouter} from 'react-router-dom';

class NuevoPedido extends Component {
    state = {  }
    render() {
        
        const {id} = this.props.match.params;

        // console.log(this.props.session.getUsuario.id);

        // Obtener el id del vendedor
        const idVendedor = this.props.session.getUsuario.id;
        
        return ( 
            <Fragment>
                <h1 className="text-center">Nuevo Pedido</h1>
                <div className="row">
                    <div className="col-md-3">
                        <DatosCliente
                            id={id}
                        />
                    </div>
                    <div className="col-md-9">
                        <Query query={PRODUCTOS_QUERY} variables={{stock: true}}>
                            {({loading, error, data}) => {
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

                                if(error) return `Error, ${error.message}`;

                                // console.log(data.getProductos);

                                return (
                                    <ContenidoPedido
                                        productos={data.getProductos}
                                        id={id}
                                        idVendedor={idVendedor}
                                    />
                                );
                            }}
                        </Query>
                    </div>
                </div>    
            </Fragment>
        );
    }
}

export default withRouter(NuevoPedido);
