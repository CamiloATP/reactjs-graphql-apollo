import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { CLIENTES_QUERY } from '../../queries';
import { ELIMINAR_CLIENTE } from '../../mutations';
import { Link } from 'react-router-dom';
import Paginador from '../Paginador';
import Exito from '../Alertas/Exito';

class Clientes extends Component {

    limite = 2;

    state = {
        paginador :{
            offset: 0,
            actual: 1
        },
        alerta:{
            mostrar: false,
            mensaje: ''
        }       
    }

    paginaAnterior = () => {
        this.setState({
            paginador: {
                offset: this.state.paginador.offset - this.limite,
                actual: this.state.paginador.actual - 1
            }
        });
    }

    paginaSiguiente = () => {
        this.setState({
            paginador: {
                offset: this.state.paginador.offset + this.limite,
                actual: this.state.paginador.actual + 1
            }
        });
    }
  
    render() {

        const {alerta:{mostrar, mensaje}} = this.state;

        let alerta = (mostrar) ? <Exito mensaje={mensaje}/> : '';

        // Obtener el id del vendedor
        // console.log(this.props.session.getUsuario.id);

        let id_usuario;

        const {rol} = this.props.session.getUsuario;

        if(rol === 'Vendedor')
        {
            id_usuario = this.props.session.getUsuario.id;
        }else{
            id_usuario = '';
        }

        return(
            <Query 
                query={CLIENTES_QUERY} 
                pollInterval={500} 
                variables={
                    {   
                        limite: this.limite, 
                        offset: this.state.paginador.offset,
                        vendedor: id_usuario
                    }
                }
            >
                {({ loading, error, data, startPolling, stopPolling }) => {
                    if(loading) return "Cargando...";
                    if(error) return `Error: ${error.message}`;

                    console.table(data);

                    return (
                        <Fragment>
                            <h2 className="text-center">Lista de clientes</h2>
                            {alerta}
                            <ul className="list-group mt-5">
                                {
                                    data.getClientes.map(item => {
                                        const {id} = item;
                                        return(
                                            <li key={item.id} className="list-group-item">
                                                <div className="row justify-content-between align-items-center">
                                                    <div className="col-md-6 d-flex justify-content-between align-items-center">
                                                        {item.nombre} {item.apellido} - {item.empresa}
                                                    </div>
                                                    <div className="col-md-6 d-flex justify-content-end align-items-center">
                                                        <Link 
                                                            to={`pedidos/nuevo/${id}`} 
                                                            className="btn btn-warning d-block d-md-inline-block mr-2"
                                                        > &#43; Nuevo Pedido</Link>
                                                        <Link 
                                                            to={`pedidos/${id}`} 
                                                            className="btn btn-primary d-block d-md-inline-block mr-2"
                                                        > &#43; Ver Pedido</Link>
                                                        <Mutation mutation={ELIMINAR_CLIENTE}
                                                            onCompleted={(data) => {
                                                                // Recibe data del EliminarProducto en GraphQL
                                                                console.log(data);
    
                                                                this.setState({
                                                                    alerta:{
                                                                        mostrar: true,
                                                                        mensaje: data.eliminarProducto
                                                                    }
                                                                }, ()=> {
                                                                    setTimeout(() => {
                                                                        this.setState({
                                                                            alerta:{
                                                                                mostrar: false,
                                                                                mensaje: ''
                                                                            }
                                                                        })
                                                                    }, 3000);
                                                                });
                                                            }}
                                                        >
                                                            {eliminarCliente => (
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger d-block d-md-inline-block mr-2"
                                                                    onClick={()=>{
                                                                        if (window.confirm('Deseas eliminar este cliente?')) {
                                                                            eliminarCliente({
                                                                                variables: {id}
                                                                            });
                                                                        }
                                                                    }}
                                                                >&times; Eliminar</button>                                                        
                                                            )}
                                                        </Mutation>
                                                        <Link to={`/clientes/editar/${item.id}`} className="btn btn-success d-block d-md-inline-block">
                                                            Editar cliente
                                                        </Link>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <Paginador 
                                actual={this.state.paginador.actual}
                                total={data.totalClientes}
                                limite={this.limite}
                                paginaAnterior={this.paginaAnterior}
                                paginaSiguiente={this.paginaSiguiente}
                            />
                        </Fragment>     
                    );
                }}
            </Query>    
        )
    }
}

export default Clientes;
