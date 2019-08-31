import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import Animated from 'react-select/animated';
import Resumen from './Resumen';

class ContenidoPedido extends Component {
    state = { 
        productos: [],
        total: 0
    }

    // Por default recibe productos del Select
    seleccionarProducto = (productos) => {
        this.setState({
            productos
        });
        // console.log(`Algo pasó con `, productos);
    }

    actualizarCantidad = (cantidad, index) => {
        // console.log(cantidad);
        let nuevoTotal = 0;
        
        // Leer el state de productos
        const productos = this.state.productos;
        
        // Cuando no se selecciona un producto o se elimina
        if(productos.length === 0)
        {
            this.setState({
                total: nuevoTotal
            });

            // Para salir de la función
            return;
        }

        // Agregar la cantidad desde la interfaz
        productos[index].cantidad = Number(cantidad);
        // console.log(productos);

        // Realizar la operación de (precio x cantidad)
        productos.map(producto => nuevoTotal += (producto.precio * producto.cantidad));
        
        // Actualizar la cantidad de los productos

        // Validamos

        // Agregamos al state los productos seleccionados
        this.setState({
            productos,
            total: nuevoTotal
        });
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
                    actualizarCantidad={this.actualizarCantidad}
                />
                <p className="font-weight-bold float-right mt-3">
                    Totatl:
                    <span className="font-weight-normal">
                        $ {this.state.total}
                    </span>
                </p>
            </Fragment>
        );
    }
}
 
export default ContenidoPedido;