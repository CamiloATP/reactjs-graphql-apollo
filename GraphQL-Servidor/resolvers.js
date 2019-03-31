// Se crear una clase cliente con un contructor con parametros
class Cliente{
    constructor(id, {nombre, apellido, empresa, email, edad}){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.empresa = empresa;
        this.email = email;
        this.edad = edad;
    } 
}

// Emula un DB, la constante es igual a un objeto vacio.
const clientesDB = {};

// El Resolver
const resolvers = {
    getCliente: ({id}) => {
        return new Cliente(id, clientesDB[id]);
    },
    crearCliente: ({input}) => {
        const id = require('crypto').randomBytes(10).toString('hex');
        // array (id => input)
        clientesDB[id] = input;
        //////////////////////////////////////////////////////////////
        // Se retorna una nueva instacia de cliente, el cual recibe //
        // por parametro el id y el object input                    //
        //////////////////////////////////////////////////////////////
        return new Cliente(id, input);
    }
};

export default resolvers;