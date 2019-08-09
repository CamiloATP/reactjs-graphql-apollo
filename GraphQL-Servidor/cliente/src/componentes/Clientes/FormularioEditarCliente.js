import React, { Component } from 'react';
import {ACTUALIZAR_CLIENTE} from '../../mutations';
import {Mutation} from 'react-apollo'; 
import { withRouter } from 'react-router-dom';

class FormularioEditarCliente extends Component {
    constructor (props){
        super(props);
        this.state = {
            cliente: this.props.cliente,
            emails: this.props.cliente.emails
        }
    }

    nuevoCampo = () => {
        this.setState({
            emails: this.state.emails.concat([{ email: '' }])
        })
    }

    leerCampo = i => e => {
        const nuevoMail = this.state.emails.map((email, index) => {
            if (i !== index) return email;
            return { ...email, email: e.target.value };
        });
        this.setState({ emails: nuevoMail });
    }
    
    quitarCampo = (i) => (e) => {
        console.log(`Presionaste ${i}`);
        
        let data = this.state.emails.filter((emails, index) => i !== index);

        console.log(`sin el state`);
        console.table(data);
        
        this.setState({
            cliente: {
                ...this.state.cliente,
                emails: data
            },
            emails: data
        });        
        
        let { emails } = this.state;

        console.log(`En el state`);

        let last =  emails[emails.length-1].email;
        console.table(last);


        let test = document.querySelector("[value='"+last+"']");
        test.title = "red";
        console.log(test)
        // console.log(e.target.value)
    }
    
    render() {
        const {nombre, apellido, edad, empresa, tipo} = this.state.cliente;
        const { emails } = this.state;

        return (
            <Mutation 
                mutation={ACTUALIZAR_CLIENTE}
                onCompleted={() => this.props.refetch().then(() =>{
                        this.props.history.push('/');
                    })
                }
            >
                {actualizarCliente => (
                    <form 
                        className="col-md-8 m-3"
                        onSubmit={ e => {
                                e.preventDefault();

                                const id = this.props.id;
                                // const {nombre, apellido, edad, empresa, tipo} = this.state.cliente;                               
                                // const {emails} = this.state;

                                const input = {
                                    id,
                                    nombre,
                                    apellido,
                                    edad: Number(edad),
                                    empresa,
                                    tipo,
                                    emails
                                }

                                console.log(id);

                                actualizarCliente({
                                    variables: {input}
                                });
                            }
                        }                     
                    >
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={nombre}
                                    onChange= { e => {
                                            this.setState({
                                                cliente: {
                                                    ...this.state.cliente,
                                                    nombre: e.target.value
                                                }
                                            });
                                        }
                                    }
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Apellido</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={apellido}
                                    onChange= { e => {
                                            this.setState({
                                                cliente: {
                                                    ...this.state.cliente,
                                                    apellido: e.target.value
                                                }
                                            });
                                        }
                                    }
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label>Empresa</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={empresa}
                                    onChange= { e => {
                                            this.setState({
                                                cliente: {
                                                    ...this.state.cliente,
                                                    empresa: e.target.value
                                                }
                                            });
                                        }
                                    }
                                />
                            </div>

                            {emails.map((input, index) => (
                                
                                <div key={index} className="form-group col-md-12">
                                    <label>Email {index + 1} : </label>
                                    <div className="input-group">
                                        <input
                                            type="email"
                                            placeholder={`Email`}
                                            className="form-control"
                                            onChange={this.leerCampo(index)}
                                            defaultValue={input.email}
                                            onLoad={()=> this.props.refetch()}
                                        />
                                        <div className="input-group-append">
                                            <button
                                                onClick={this.quitarCampo(index)}
                                                className="btn btn-danger"
                                                type="button"
                                            >
                                                &times; Eliminar
                                                        </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="form-group d-flex justify-content-center col-md-12">
                                <button
                                    onClick={this.nuevoCampo}
                                    type="button"
                                    className="btn btn-warning"
                                >+ Agregar Email</button>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Edad</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={edad}
                                    onChange= { e => {
                                            this.setState({
                                                cliente: {
                                                    ...this.state.cliente,
                                                    edad: e.target.value
                                                }
                                            });
                                        }
                                    }
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Tipo Cliente</label>
                                <select
                                    onChange= { e => {
                                            this.setState({
                                                cliente: {
                                                    ...this.state.cliente,
                                                    tipo: e.target.value
                                                }
                                            });
                                        }
                                    }
                                    defaultValue={tipo}
                                    className="form-control"
                                >
                                    <option value="">Elegir...</option>
                                    <option value="PREMIUM">PREMIUM</option>
                                    <option value="BASICO">BÁSICO</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success float-right">Guardar Cambios</button>
                    </form>
                )}
            </Mutation>
        )
    }
}


export default withRouter(FormularioEditarCliente);