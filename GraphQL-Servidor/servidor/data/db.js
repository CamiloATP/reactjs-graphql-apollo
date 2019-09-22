import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// If we want to use mongoose in different position inside the codes
mongoose.Promise = global.Promise;

// Si se usa una db se debe colocar la ruta del archivo, el nombre de db esta en la ruta
mongoose.connect('mongodb://localhost/DBcliente', {useNewUrlParser: true});

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

// Definir el schema de clientes
const clienteSchema = new mongoose.Schema(
    {
        nombre: String,
        apellido: String,
        empresa: String,
        emails: Array,
        edad: Number,
        tipo: String,
        pedidos: Array,
        vendedor: mongoose.Types.ObjectId
    }
);

// Por defecto se crea la tabla con una s al final con Mongo Compass Community
const Cliente = mongoose.model('clientes', clienteSchema);

// Definir el schema de Productos
const productoSchema = new mongoose.Schema(
    {
        nombre: String,
        precio: Number,
        stock: Number
    }
);

// Por defecto se crea la tabla con una s al final con Mongo Compass Community
const Producto = mongoose.model('productos', productoSchema);

//Pedidos
const pedidosSchema = new mongoose.Schema(
    {
        pedido: Array,
        total: Number,
        fecha: Date,
        // cliente: String,
        cliente: mongoose.Types.ObjectId,
        estado: String
    }
);

const Pedido = mongoose.model('Pedidos', pedidosSchema);

// Usuarios

const usuarioSchema = new mongoose.Schema(
    {
        usuario: String,
        nombre: String,
        password: String,
        rol: String
    }
);

// Antes de guardar en la base de datos
usuarioSchema.pre('save', function(next) {
    // Si el password no esta modificado
    if(!this.isModified('password'))
    {
        return next();
    }

    bcrypt.genSalt(10, (error, salt) => {
        if(error) return next(error);

        bcrypt.hash(this.password, salt, (error, hash) => {
            if(error) return next(error);

            this.password = hash;
            next();
        });
    });
});

const Usuario = mongoose.model('usuarios', usuarioSchema);

// NOTE: se utiliza Robo 3T tambien como gestor de base de datos. NoSQL
export { Cliente, Producto, Pedido, Usuario } ;