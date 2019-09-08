import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import Animated from 'react-select/animated';
import Resumen from './Resumen';
import GenerarPedido from './GenerarPedido';
import Error from './../Alertas/Error';

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

    actualizarTotal = () => {
        // Leer el state de productos
        const productos = this.state.productos;

        // Cuando no se selecciona un producto o se elimina            
        if(productos.length === 0)
        {
            this.setState({
                total: 0
            });
            
            // Para salir de la función
            return;
        }
        
        let nuevoTotal = 0;

        // Realizar la operación de (precio x cantidad)
        productos.map(producto => nuevoTotal += (producto.precio * producto.cantidad));
        
        this.setState({
            total: nuevoTotal
        });
    }

    actualizarCantidad = (cantidad, index) => {
        
        // Leer el state de productos
        const productos = this.state.productos;        

        // Agregar la cantidad desde la interfaz
        productos[index].cantidad = Number(cantidad);
        // console.log(productos);

        
        // Actualizar la cantidad de los productos

        // Validamos

        // Agregamos al state los productos seleccionados
        this.setState({
            productos
        }, () => {
            this.actualizarTotal();
        });
    }

    eliminarProducto = (id) => {
        // console.log(id);

        const productos = this.state.productos;

        // Asigna todos los registro menos el recibido por el id
        const productosRestantes = productos.filter(producto => producto.id !== id);

        this.setState({
            productos: productosRestantes
        }, () => {
            this.actualizarTotal();
        });
    }

    render() { 
        const mensaje = (this.state.total < 0) ? <Error error="Las cantidades no pueden ser negativas"></Error> : '';

        return (


            <Fragment>
                <h2 className="text-center mb-5">Seleccionar Artículos</h2>
                {mensaje}
                <Select
                    onChange={this.seleccionarProducto}
                    options={this.props.productos}
                    isMulti={true}
                    components={Animated()}
                    placeholder={'Seleccionar Productos'}
                    getOptionValue={(options) => options.id}
                    getOptionLabel={(options) => options.nombre}
                    value={this.state.productos}
                />

                <Resumen 
                    productos={this.state.productos}
                    actualizarCantidad={this.actualizarCantidad}
                    eliminarProducto={this.eliminarProducto}
                />
                <p className="font-weight-bold float-right mt-3">
                    Totatl:
                    <span className="font-weight-normal">
                        $ {this.state.total}
                    </span>
                </p>
                <GenerarPedido 
                    productos={this.state.productos}
                    total={this.state.total}
                    id_cliente={this.props.id} // <-- ID cliente desde NuevoPedido
                />
            </Fragment>
        );
    }
}
 
export default ContenidoPedido;