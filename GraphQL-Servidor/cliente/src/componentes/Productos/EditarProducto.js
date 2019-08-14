import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import {PRODUCTO_QUERY} from '../../queries';
import FormularioEditarProducto from './FormularioEditarProducto';

class EditarProducto extends Component {
    state = {  }
    render() { 
        // Obtener el ID para editar
        const {id} = this.props.match.params;

        // console.log('--> '+id);
        return ( 
            <Fragment>
                <h1 className="text-center">Editar Producto</h1>
                
                <div className="row justify-content-center">
                    <Query query={PRODUCTO_QUERY} variables={{id}}>
                    {({loading, error, data, refetch}) => {
                        if(loading) return "Cargando";
                        if(error) return `Error ${error.message}`;

                        console.log(data.getProducto);

                        return(
                            <FormularioEditarProducto 
                                producto={data}
                                id={id}
                                refetch={refetch}
                            />
                        )
                    }}
                    </Query>
                </div>
            </Fragment>    
        );
    }
}
 
export default EditarProducto;