import mongoose, { Promise } from 'mongoose';
import { Cliente } from './db';
import { rejects } from 'assert';

export const resolvers = {
    // Sintaxis de graphql-tools.
    Query: {
        getCliente: ({id}) => {
            return new Cliente(id, clientesDB[id]);
        }
    },
    Mutation: {
        crearCliente: (root, {input}) => {
            // Se crear una nueva instacia del objeto Cliente.
            const nuevoCliente = new Cliente({
                nombre : input.nombre,
                apellido : input.apellido,
                empresa : input.empresa,
                emails : input.emails,
                edad : input.edad,
                tipo : input.tipo,
                pedidos : input.pedidos
            });
            // Mongo agrega automaticamente el id con _id
            nuevoCliente.id = nuevoCliente._id;
            
            // Los promise tratan de ejecutar un código.
            return new Promise((resolve, object) => {
                // Se registra el nuevo cliente
                nuevoCliente.save((error) => {
                    // Para verificar si se inserto el registro.
                    if(error) rejects(error);
                    else resolve(nuevoCliente);
                });
            });
        }
    }
}


