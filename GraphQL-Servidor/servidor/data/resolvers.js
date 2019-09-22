import mongoose, { Promise } from 'mongoose';
import { Cliente, Producto, Pedido, Usuario } from './db';
import { rejects } from 'assert';
// import { resolve } from 'url';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({path: 'variables.env'});

const crearToken = (usuarioLogin, secreto, expiresIn) => {
    const {usuario} = usuarioLogin;
    return jwt.sign({usuario}, secreto, {expiresIn});
}

const ObjectId = mongoose.Types.ObjectId;

export const resolvers = {
    // Sintaxis de graphql-tools.
    Query: {
        getClientes: (root, {limit, offset, vendedor}) => {

            let filtro;

            if(vendedor)
            {
                filtro = {vendedor: new ObjectId(vendedor)}
            }

            return Cliente.find(filtro).limit(limit).skip(offset);
        },
        getCliente: (root, {id}) => {
            return new Promise((resolve, object) => {
                Cliente.findById(id, (error, cliente) => {
                    if(error) rejects(error);
                    else resolve(cliente);
                });
            });
        },
        totalClientes : (root, {vendedor}) => {

            let filtro;

            if(vendedor)
            {
                filtro = {vendedor: new ObjectId(vendedor)}
            }

            return new Promise((resolve, object) => {

                Cliente.countDocuments(filtro, (error, count) => {
                    if(error) rejects(error);
                    else resolve(count);
                });
            });
        },
        getProductos: (root, {limit, offset, stock}) => {
            let filtro;
            if(stock){
                filtro = {stock: {$gt : 0}}
            }
            return Producto.find(filtro).limit(limit).skip(offset);
        },
        getProducto: (root, {id}) => {
            return new Promise((resolve, object) => {
                Producto.findById(id, (error, producto) => {
                    if(error) rejects(error);
                    else resolve(producto);
                });
            });
        },
        totalProductos: (root) => {
            return new Promise((resolve, object) => {
                Producto.countDocuments({}, (error, count) => {
                    if(error) rejects(error);
                    else resolve(count);
                });
            });
        },
        getPedidos: (root, {cliente}) => {
            return new Promise((resolve, object) => {
                Pedido.find({cliente: cliente}, (error, pedido) => {
                    if(error) rejects(error);
                    else resolve(pedido);
                });
            });
        },
        topClientes: (root) => {
            return new Promise((resolve, object) => {
                Pedido.aggregate([
                    {
                        $match: {estado: "COMPLETADO"}
                    },
                    {
                        $group: {
                            _id: "$cliente",
                            total: {$sum: "$total"}
                        }
                    },
                    {
                        $lookup: {
                            from: 'clientes',
                            localField: '_id',
                            foreignField: '_id',
                            as: 'cliente'
                        }
                    },
                    {
                        $sort: {total: -1}
                    },
                    {
                        $limit: 10
                    }
                ], (error, result) => {
                    if(error) rejects(error);
                    else resolve(result);
                });
            });
        },
        getUsuario: (root, args, {usuarioActual}) => {
            if(!usuarioActual)
            {
                return null;
            }

            console.log(usuarioActual);

            const usuario = Usuario.findOne({usuario: usuarioActual.usuario});

            return usuario;
        },
        topVendedores: (root) => {
            return new Promise((resolve, object) => {
                Pedido.aggregate([
                    {
                        $match: {estado: "COMPLETADO"}
                    },
                    {
                        $group:{
                            _id: "$vendedor",
                            total: {$sum: "$total"}
                        }
                    },
                    {
                        $lookup:{
                            from: "usuarios",
                            localField: '_id',
                            foreignField: '_id',
                            as: 'vendedor'
                        }
                    },
                    {
                        $sort: {total: -1}
                    },
                    {
                        $limit: 10
                    }
                ], (error, result) => {
                    if(error) rejects(error);
                    else resolve(result);
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
                pedidos: input.pedidos,
                vendedor: input.vendedor
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
                estado: "PENDIENTE",
                vendedor: input.vendedor
            });

            nuevoPedido.id = nuevoPedido._id;

            return new Promise((resolve, object) => {

                // input.pedido.forEach(pedido => {
                //     Producto.updateOne({_id : pedido.id},
                //         {
                //             "$inc" : {"stock" : - pedido.cantidad}
                //         }, function(error){
                //             if(error) return new Error(error);
                //         }
                //     );
                // });

                nuevoPedido.save((error) => {
                    if(error) rejects(error);
                    else resolve(nuevoPedido);
                });
            });
        },
        actualizarEstado: (root, {input}) => {
            return new Promise((resolve, object) => {

                const {estado} = input;

                let instruccion;

                if(estado === 'COMPLETADO'){
                    instruccion = '-';
                }else if(estado === 'CANCELADO'){
                    instruccion = '+';
                }

                input.pedido.forEach(pedido => {
                    Producto.updateOne({_id : pedido.id},
                        {
                            "$inc" : {"stock" : `${instruccion}${pedido.cantidad}`}
                        }, function(error){
                            if(error) return new Error(error);
                        }
                    );
                });

                Pedido.findOneAndUpdate({_id: input.id}, input, {new:true}, (error) => {
                    if(error) rejects(error);
                    else resolve('Se actualizó correctamente');
                });
            });
        },
        crearUsuario: async(roo, {usuario, nombre, password, rol}) => {
            // Revisar si exite el usuario
            const existeUsuario = await Usuario.findOne({usuario});

            if(existeUsuario)
            {
                throw new Error('El usuario ya se encuentra registrado');
            }

            const nuevoUsuario = await new Usuario({
                usuario,
                nombre,
                password,
                rol
            }).save();

            // console.log(nuevoUsuario);
            return "Creado Correctamente";
        },
        autenticarUsuario: async (root, {usuario, password}) => {
            const nombreUsuario = await Usuario.findOne({usuario});

            if(!nombreUsuario)
            {
                throw new Error('Usuario no encontrado');
            }

            const passwordCorrecto = await bcrypt.compare(password, nombreUsuario.password);

            if(!passwordCorrecto)
            {
                throw new Error('Password Incorrecto');
            }

            return {
                token: crearToken(nombreUsuario, process.env.SECRETO, '1hr')
            }
        }
    }
}


