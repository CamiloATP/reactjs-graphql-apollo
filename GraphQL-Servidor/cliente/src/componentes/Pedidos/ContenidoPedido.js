import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import Animated from 'react-select/animated';
import Resumen from './Resumen';

class ContenidoPedido extends Component {
    state = { 
        productos: []
    }

    // Por default recibe productos del Select
    seleccionarProducto = (productos) => {
        this.setState({
            productos
        });
        // console.log(`Algo pasó con `, productos);
    }
    render() { 
        return ( 
            <Fragment>
                <h2 className="text-center mb-5">Seleccionar Artículos</h2>
                <Select
                    onChange={this.seleccionarProducto}
                    options={this.props.productos}
                    isMulti={true}
                    components={Animated()}
                    placeholder={'Seleccionar Productos'}
                    getOptionValue={(options) => options.id}
                    getOptionLabel={(options) => options.nombre}
                />

                <Resumen 
                    productos={this.state.productos}
                />
            </Fragment>
        );
    }
}
 
export default ContenidoPedido;