import React, { Component, Fragment } from 'react';

const initialState = {
    usuario: '',
    password: '',
    repetirPassword: ''
};

class Registro extends Component {
    state = {
        ...initialState
    }

    actualizarState = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    }

    validarForm = () => {
        const {usuario, password, repetirPassword} = this.state;

        // Sino hay usuario
        const noValido = !usuario || !password || password !== repetirPassword;

        return noValido;
    }

    render() { 
        return (
            <Fragment>
                <h1 className="text-center mb-5">Nuevo Usuario</h1>
                <div className="row  justify-content-center">
                    <form 
                        className="col-md-8"
                    >
                        <div className="form-group">
                            <label>Usuario</label>
                            <input
                                onChange={this.actualizarState}
                                type="text" 
                                name="usuario" 
                                className="form-control" 
                                placeholder="Nombre Usuario" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                onChange={this.actualizarState}
                                type="password" 
                                name="password" 
                                className="form-control" 
                                placeholder="Password"
                            />
                        </div>
                        <div className="form-group">
                            <label>Repetir Password</label>
                            <input
                                onChange={this.actualizarState}
                                type="password" 
                                name="repetirPassword" 
                                className="form-control" 
                                placeholder="Repetir Password" 
                            />
                        </div>

                        <button
                            disabled={this.validarForm()}
                            type="submit" 
                            className="btn btn-success float-right">
                                Crear Usuario
                        </button>
                    </form>
                </div>
            </Fragment>
        );
    }
}
 
export default Registro;