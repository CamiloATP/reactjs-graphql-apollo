import mongoose from 'mongoose';

// Conexión
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
        pedidos: Array 
    }
);

// Por defecto se crea la tabla con una s al final con Mongo Compass Community
const Cliente = mongoose.model('clientes', clienteSchema);

// NOTE: se utiliza Robo 3T tambien como gestor de base de datos. NoSQL

export { Cliente } ;