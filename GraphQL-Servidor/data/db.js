import mongoose from 'mongoose';

// Conexión
mongoose.Promise = global.Promise;

// Si se usa una db se debe colocar la ruta del archivo
mongoose.connect('mongodb://localhost/clientes', {useNewUrlParser: true});


// Definir el schema de clientes

const clientesSchema = new mongoose.Schema(
    {
        nombre: String,
        apellido: String,
        empresa: String,
        email: String,
        edad: Number,
        tipo: String,
        pedidos: Array 
    }
);

const Cliente = mongoose.model('clientes', clientesSchema);

export { Cliente } ;