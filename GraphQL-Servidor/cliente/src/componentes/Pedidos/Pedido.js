import React from 'react';

const Pedido = () => {
    return (
        <div className="col-md-4">
            <div className={`card mb-3`} >
                <div className="card-body">
                    <p className="card-text font-weight-bold ">Estado:
                            <select className="form-control my-3">
                                    <option value="PENDIENTE">PENDIENTE</option>
                                    <option value="COMPLETADO">COMPLETADO</option>
                                    <option value="CANCELADO">CANCELADO</option>
                            </select>
                    </p> 
                    <p className="card-text font-weight-bold">Pedido ID:
                        <span className="font-weight-normal"></span>
                    </p> 
                    <p className="card-text font-weight-bold">Fecha Pedido: 
                        <span className="font-weight-normal"></span>
                    </p>
                    <p className="card-text font-weight-bold">Total: 
                        <span className="font-weight-normal"> </span>
                    </p>

                    <h3 className="card-text text-center mb-3">Artículos del pedido</h3>
                </div>
            </div>
        </div>
    );
}
 
export default Pedido;