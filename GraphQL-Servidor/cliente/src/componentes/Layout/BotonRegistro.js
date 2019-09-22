import React from 'react';
import {Link} from 'react-router-dom';

const BotonRegistro = ({session}) => {
    console.log(session.session.getUsuario.rol);

    const {rol} = session.session.getUsuario;

    if(rol !== 'Administrador') return null;

    return (
        <Link to='/registro' className="btn btn-warning ml-md-2 mt-2 mt-md-0">Crear Usuarios</Link>
    );
}
 
export default BotonRegistro;