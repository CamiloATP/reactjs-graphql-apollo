import mongoose from 'mongoose';
import { Cliente } from './db';

// Se crear una clase cliente con un contructor con parametros
class Cliente{
    constructor(id, {nombre, apellido, empresa, emails, edad, tipo, pedidos}){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.empresa = empresa;
        this.emails = emails;
        this.edad = edad;
        this.tipo = tipo;
        this.pedidos = pedidos;
    } 
}

export const resolvers = {
    // Sintaxis de graphql-tools
    Query: {
        getCliente: ({id}) => {
            return new Cliente(id, clientesDB[id]);
        }
    },
    Mutation: {
        crearCliente: (root, {input}) => {
            const id = require('crypto').randomBytes(10).toString('hex');
            // array (id => input)
            clientesDB[id] = input;
            //////////////////////////////////////////////////////////////
            // Se retorna una nueva instacia de cliente, el cual recibe //
            // por parametro el id y el object input                    //
            //////////////////////////////////////////////////////////////
            return new Cliente(id, input);
        }
    }
}


