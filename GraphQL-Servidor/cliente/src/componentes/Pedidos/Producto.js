import React, { Component, Fragment } from 'react';

class Producto extends Component {
    state = {  }
    render() { 

        const {producto} = this.props;
        
        return ( 
            <Fragment>
                <tr>
                    <td>{producto.nombre}</td>
                    <td>$ {producto.precio}</td>
                    <td>{producto.stock}</td>
                    <td>
                        <input 
                            type="number" 
                            className="form-control"
                        />
                    </td>
                    <td>
                        <button 
                            type="button"
                            className="btn btn-danger"
                        >
                            &times; Eliminar    
                        </button>
                    </td>
                </tr>
            </Fragment>
        );
    }
}
 
export default Producto;