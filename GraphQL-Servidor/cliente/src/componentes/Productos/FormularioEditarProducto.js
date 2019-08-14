import React, { Component } from 'react';

const initialState = {
    nombre: '',
    precio: '',
    stock: ''
}

class FormularioEditarProducto extends Component {
    state = {
        // Copia para el state de getProducto
        ...this.props.producto.getProducto
    }

    limpiarState = () => {
        this.setState({
            ...initialState
        })
    }

    actualizarCampo = e => {
        const {name, value} = e.target;
        // console.log(`${name} : ${value}`)
        this.setState({
            [name]: value
        });
    }

    validarForm = () => {
        const {nombre, precio, stock} = this.state;

        // Si no existe nada return true para disabled
        const noValido = !nombre || !precio || !stock;

        return noValido;
    }

    render() { 
        const {nombre, precio, stock} = this.state;

        const input = {
            nombre,
            precio: Number(precio),
            stock: Number(stock)
        }

        return ( 
            <form 
                className="col-md-8" 
            >
                <div className="form-group">
                    <label>Nombre:</label>
                    <input 
                        onChange={this.actualizarCampo}
                        type="text"
                        name="nombre" 
                        className="form-control" 
                        placeholder="Nombre del Producto"
                        defaultValue={nombre}
                    />
                </div>
                <div className="form-group">
                    <label>Precio:</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">$</div>
                        </div>
                        <input 
                            onChange={this.actualizarCampo}
                            type="number" 
                            name="precio" 
                            className="form-control" 
                            placeholder="Precio del Producto"
                            defaultValue={precio}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Stock:</label>
                    <input 
                        onChange={this.actualizarCampo}
                        type="number" 
                        name="stock" 
                        className="form-control" 
                        placeholder="stock del Producto" 
                        defaultValue={stock}
                    />
                </div>
                <button 
                    disabled={this.validarForm()}
                    type="submit" 
                    className="btn btn-success float-right">
                            Guardar Cambios
                </button>
            </form>
        );
    }
}
 
export default FormularioEditarProducto;