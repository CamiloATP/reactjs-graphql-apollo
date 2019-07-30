import mongoose, { Promise } from 'mongoose';
import { Cliente } from './db';
import { rejects } from 'assert';

export const resolvers = {
    // Sintaxis de graphql-tools.
    Query: {
        getClientes: (root, {limit}) => {
            return Cliente.find({}).limit(limit);
        },
        getCliente: (root, {id}) => {
            return new Promise((resolve, object) => {
                Cliente.findById(id, (error, cliente) => {
                    if(error) rejects(error);
                    else resolve(cliente);
                });
            });
        }
    },
    Mutation: {
        crearCliente: (root, {input}) => {
            // Se crear una nueva instacia del objeto Cliente.
            const nuevoCliente = new Cliente({
                nombre : input.nombre,
                apellido : input.apellido,
                empresa : input.empresa,
                email : input.email,
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
        },
        actualizarCliente: (root, {input}) => {
            return new Promise((resolve, object) => {
                // Encuentra por id del registro y actualiza. {new: true} si no existe crea el registro.
                Cliente.findOneAndUpdate( { _id : input.id }, input, {new: false}, (error, cliente)  => {
                    // Para verificar si se actualizo el registro
                    if(error) rejects(error);
                    else resolve(cliente);
                });
            });
        },
        eliminarCliente: (root, {id}) => {
            return new Promise((resolve, object) => {
                Cliente.findOneAndRemove({ _id : id }, (error) => {
                    if(error) rejects(error);
                    else resolve("El registro " + id + " fue eliminado con éxito");
                });
            });
        }
    }
}


