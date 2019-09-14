import React from 'react';
import {Query, Mutation} from 'react-apollo';
import {PRODUCTO_QUERY} from './../../queries';
import {ACTUALIZAR_ESTADO} from './../../mutations';
import ResumenProducto from './ResumenProducto';

const Pedido = (props) => {

    const {pedido} = props;

    const {estado} = pedido;

    const {id} = pedido;

    const fecha = new Date(Number(pedido.fecha));

    let clase;

    if (estado === 'PENDIENTE') {
        clase = 'border-light';
    } else if (estado === 'CANCELADO') {
        clase = 'border-danger';
    }else {
        clase = 'border-success';
    }

    return (
        <div className="col-md-4">
            <div className={`card mb-3 ${clase}`} >
                <div className="card-body">
                    <p className="card-text font-weight-bold ">Estado:

                        <Mutation mutation={ACTUALIZAR_ESTADO}>
                            {actualizarEstado => (
                                <select 
                                    className="form-control my-3" 
                                    value={pedido.estado}
                                    onChange={e => {
                                        const input = {
                                            id,
                                            pedido: pedido.pedido,
                                            fecha: pedido.fecha,
                                            total: pedido.total,
                                            cliente: props.cliente,
                                            estado: e.target.value
                                        }

                                        // console.log(input);

                                        actualizarEstado({
                                            variables: {input}
                                        });
                                    }}
                                >
                                    <option value="PENDIENTE">PENDIENTE</option>
                                    <option value="COMPLETADO">COMPLETADO</option>
                                    <option value="CANCELADO">CANCELADO</option>
                                </select>
                            )}

                        </Mutation>
                    </p> 
                    <p className="card-text font-weight-bold">Pedido ID:
                        <span className="font-weight-normal"> {pedido.id}</span>
                    </p> 
                    <p className="card-text font-weight-bold">Fecha Pedido: 
                        <span className="font-weight-normal"> {fecha.toLocaleString('es-CL')}</span>
                    </p>
                    <p className="card-text font-weight-bold">Total: 
                        <span className="font-weight-normal">$ {pedido.total}</span>
                    </p>

                    <h3 className="card-text text-center mb-3">Artículos del pedido</h3>
                    {pedido.pedido.map((producto, index) => {

                        const {id} = producto;

                        return (
                            <Query key={pedido.id + index} query={PRODUCTO_QUERY} variables={{id}}>
                                {({loading, error, data}) => {
                                    if(loading) return 'Cargando..';
                                    if(error) return `Error ${error.message}`;
                                    
                                    console.log(data);

                                    return (
                                        <ResumenProducto
                                            producto={data.getProducto}
                                            cantidad={producto.cantidad}
                                            key={producto.id}
                                        />
                                    );
                                }}
                            </Query>    
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
 
export default Pedido;