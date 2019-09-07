import mongoose, { Promise } from 'mongoose';
import { Cliente, Producto, Pedido } from './db';
import { rejects } from 'assert';
import { resolve } from 'url';

export const resolvers = {
    // Sintaxis de graphql-tools.
    Query: {
        getClientes: (root, {limit, offset}) => {
            return Cliente.find({}).limit(limit).skip(offset);
        },
        getCliente: (root, {id}) => {
            return new Promise((resolve, object) => {
                Cliente.findById(id, (error, cliente) => {
                    if(error) rejects(error);
                    else resolve(cliente);
                });
            });
        },
        totalClientes : (root) => {
            return new Promise((resolve, object) => {
                Cliente.countDocuments({}, (error, count) => {
                    if(error) rejects(error);
                    else resolve(count);
                });
            });
        },
        getProductos: (root, {limit, offset}) => {
            return Producto.find({}).limit(limit).skip(offset);
        },
        getProducto: (root, {id}) => {
            return new Promise((resolve, object) => {
                Producto.findById(id, (error, producto) => {
                    if(error) rejects(error);
                    else resolve(producto);
                });
            });
        },
        totalProductos : (root) => {
            return new Promise((resolve, object) => {
                Producto.countDocuments({}, (error, count) => {
                    if(error) rejects(error);
                    else resolve(count);
                });
            });
        },
    },
    Mutation: {
        crearCliente: (root, {input}) => {
            // Se crear una nueva instacia del objeto Cliente.
            const nuevoCliente = new Cliente({
                nombre: input.nombre,
                apellido: input.apellido,
                empresa: input.empresa,
                emails: input.emails,
                edad: input.edad,
                tipo: input.tipo,
                pedidos: input.pedidos
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
                Cliente.findOneAndDelete({ _id : id }, (error) => {
                    if(error) rejects(error);
                    else resolve("El registro " + id + " fue eliminado con éxito");
                });
            });
        },
        nuevoProducto: (root, {input}) => {
            // Se crear una nueva instacia del objeto Producto.
            const newProducto = new Producto({
                nombre: input.nombre,
                precio: input.precio,
                stock: input.stock
            });
            // Mongo agrega automaticamente el id con _id
            newProducto.id = newProducto._id;
            
            // Los promise tratan de ejecutar un código.
            return new Promise((resolve, object) => {
                // Se registra el nuevo producto
                newProducto.save((error) => {
                    // Para verificar si se inserto el registro.
                    if(error) rejects(error);
                    else resolve(newProducto);
                });
            });
        },
        actualizarProducto: (root, {input}) => {
            return new Promise((resolve, producto) => {
                // Encuentra por id del registro y actualiza. {new: true} = Sino existe crea el registro
                // Para actualizar bien el state new puede ser true.
                Producto.findOneAndUpdate( { _id: input.id }, input, {new: true}, (error, producto) => {
                    if(error) rejects(error);
                    else resolve(producto);
                });
            });
        },
        eliminarProducto: (root, {id}) => {
            return new Promise((resolve, object) => {
                Producto.findOneAndDelete({_id: id}, (error) => {
                    if(error) rejects(error);
                    else resolve("El registro " + id + " fue eliminado con éxito");
                });
            });
        },
        nuevoPedido: (root, {input}) => {
            const nuevoPedido = new Pedido({
                pedido: input.pedido,
                total: input.total,
                fecha: new Date(),
                cliente: input.cliente,
                estado: "PENDIENTE"
            });

            nuevoPedido.id = nuevoPedido._id;

            return new Promise((resolve, object) => {

                input.pedido.forEach(pedido => {
                    Producto.updateOne({_id : pedido.id},
                        {
                            "$inc" : {"stock" : - pedido.cantidad}
                        }, function(error){
                            if(error) return new Error(error);
                        }
                    );
                });

                nuevoPedido.save((error) => {
                    if(error) rejects(error);
                    else resolve(nuevoPedido);
                });
            });
        }
    }
}


