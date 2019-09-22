import React, { Component, Fragment } from 'react';
import {Mutation} from 'react-apollo';
import {NUEVO_USUARIO} from './../../mutations';
import Error from './../Alertas/Error';

import {withRouter, Redirect} from 'react-router-dom';

const initialState = {
    usuario: '',
    nombre: '',
    password: '',
    repetirPassword: '',
    rol: ''
};

class Registro extends Component {
    state = {
        ...initialState
    }

    limpiarState = () => {
        this.setState({...initialState});
    }

    crearRegistro = (e, crearRegistro) => {
        e.preventDefault();
        console.log("Creando un registro");

        crearRegistro().then(data => {
            console.log(data);
            this.limpiarState();
            this.props.history.push('/login');
        });
    }

    actualizarState = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    }

    validarForm = () => {
        const {usuario, nombre, password, repetirPassword, rol} = this.state;

        // Sino hay usuario
        const noValido = !usuario || !nombre || !password || password !== repetirPassword || !rol;

        return noValido;
    }

    render() { 

        const {usuario, nombre, password, repetirPassword, rol} = this.state;

        console.log(this.props.session);

        const rolUsuario = this.props.session.getUsuario.rol;

        const redireccion = (rolUsuario !== 'Administrador') ? <Redirect to='/clientes' /> : '';

        return (
            <Fragment>
                {redireccion}
                <h1 className="text-center mb-5">Nuevo Usuario</h1>
                <div className="row  justify-content-center">
                    <Mutation 
                        mutation={NUEVO_USUARIO} 
                        variables={{usuario, nombre, password, rol}}
                    >
                        {(crearUsuario, {loading, error, data}) => {

                            return (
                                <form
                                    className="col-md-8"
                                    onSubmit={e => this.crearRegistro(e, crearUsuario)}
                                >
                                    {error && <Error error={error} />}
                                    
                                    <div className="form-group">
                                        <label>Usuario</label>
                                        <input
                                            onChange={this.actualizarState}
                                            type="text" 
                                            name="usuario" 
                                            className="form-control" 
                                            placeholder="Nombre Usuario"
                                            value={usuario}
                                        />
                                        <small className="form-text text-muted">
                                            (Sin espacios y sin caracteres especiales)
                                        </small>
                                    </div>
                                    <div className="form-group">
                                        <label>Nombre</label>
                                        <input
                                            onChange={this.actualizarState}
                                            type="text" 
                                            name="nombre" 
                                            className="form-control" 
                                            placeholder="Nombre Completo"
                                            value={nombre}
                                        />
                                        <small className="form-text text-muted">
                                            (Agrega el nombre y apellidos completos)
                                        </small>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md">
                                            <label>Password</label>
                                            <input
                                                onChange={this.actualizarState}
                                                type="password" 
                                                name="password" 
                                                className="form-control" 
                                                placeholder="Password"
                                                value={password}
                                            />
                                        </div>
                                        <div className="form-group col-md">
                                            <label>Repetir Password</label>
                                            <input
                                                onChange={this.actualizarState}
                                                type="password" 
                                                name="repetirPassword" 
                                                className="form-control" 
                                                placeholder="Repetir Password"
                                                value={repetirPassword}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Rol:</label>
                                        <select 
                                            onChange={this.actualizarState}
                                            className="form-control"
                                            name="rol"
                                            value={rol}
                                        >
                                            <option>Seleccione</option>
                                            <option value="Administrador">Administrador</option>
                                            <option value="Vendedor">Vendedor</option>
                                        </select>
                                    </div>

                                    <button
                                        disabled={ loading || this.validarForm()}
                                        type="submit" 
                                        className="btn btn-success float-right">
                                            Crear Usuario
                                    </button>
                                </form>
                            );
                        }}
                    </Mutation>
                </div>
            </Fragment>
        );
    }
}
 
export default withRouter(Registro);