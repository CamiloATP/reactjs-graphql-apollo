import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { CLIENTES_QUERY } from '../queries';
import { Link } from 'react-router-dom';

const Contactos = () => (
    <Query query={CLIENTES_QUERY}>
        {({ loading, error, data }) => {
            if(loading) return "Cargando...";
            if(error) return `Error: ${error.message}`;

            console.table(data.getClientes);

            return (
                <Fragment>
                    <h2 className="text-center">Lista de clientes</h2>
                    <ul className="list-group mt-5">
                        {
                            data.getClientes.map(item => (
                                <li key={item.id} className="list-group-item">
                                    <div className="row justify-content-between align-items-center">
                                        <div className="col-md-8 d-flex justify-content-between align-items-center">
                                            {item.nombre} {item.apellido} - {item.empresa}
                                        </div>
                                        <div className="col-md-4 d-flex justify-content-end align-items-center">
                                            <Link to={`/cliente/editar/${item.id}`} className="btn btn-success d-block d-md-inline-block">
                                                Editar cliente
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </Fragment>     
            );
        }}
    </Query>    
);

export default Contactos;
