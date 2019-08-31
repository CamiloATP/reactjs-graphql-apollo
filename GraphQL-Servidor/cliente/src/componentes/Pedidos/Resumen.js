import React, {Fragment} from 'react';
import Producto from './Producto';

const Resumen = (props) => {

    const productos = props.productos;
    
    // Si se borra los productos agregados, se produce un error
    // if (productos.length === 0 ) return null; // Error puede leer el largo de null
    if(productos === null) return null; // <-- Good
    if(productos.length === 0) return null;

    console.log(productos);

    return ( 
        <Fragment>
            <h2 className="text-center my-5">Resumen y Cantidades</h2>
            <table className="table table-hover">
                <thead className="bg-success text-light">
                    <tr className="font-weight-bold">
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Inventario</th>
                        <th>Cantidad</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((item, i) => (
                        <Producto
                            key={item.id}
                            id={item.id}
                            producto={item}
                            index={i}
                            actualizarCantidad={props.actualizarCantidad}
                            eliminarProducto={props.eliminarProducto}
                        />
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}
 
export default Resumen;