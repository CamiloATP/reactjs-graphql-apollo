// Se importa express
import express from 'express';

// Se importa GraphQL para Express
import graphqlHTTP from 'express-graphql';

// Se importa schema
import schema from './schema';

/////////////////////////////////////////////////////////////////////
// Express es una infraestructura web de direccionamiento y        //
// middleware que tiene una funcionalidad mínima propia: una       //
// aplicación Express es fundamentalmente una serie de llamadas a  //
// funciones de middleware.                                        //
/////////////////////////////////////////////////////////////////////
// Se crear una constante del objeto express
const app = express();

/////////////////////////////////////////////////////////////////////
// Las funciones de middleware son funciones que tiene acceso al   //
// objeto de solicitud (req), al objeto de respuesta (res) y a la  //
// siguiente(next) función de middleware en el ciclo de            //
// solicitud / respuestas de la aplicación.                        //
/////////////////////////////////////////////////////////////////////
app.get('/', (req, res) => {
    res.send('Todo Listo');
});

// Se crear una clase cliente con un contructor con parametros
class Cliente{
    constructor(id, {nombre, apellido, empresa, email}){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.empresa = empresa;
        this.email = email;
    }
}

// Emula un DB, la constante es igual a un objeto vacio.
const clientesDB = {};


// El Resolver
const root = {
    cliente: () => {
        return {
            "id": 12345678,
            "nombre": "Aquiles",
            "apellido": "Bailo",
            "empresa": "DDR",
            "email": "aquiles.bailo@gmail.com"
        }
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

///////////////////////////////////////////////////////////////////////
// Este ejemplo muestra una función de middleware sin ninguna vía de //
// acceso de montaje. La función se ejecuta para cualquier tipo de   //
// solicitud HTTP: (por ejemplo, GET, PUT o POST)                    //
///////////////////////////////////////////////////////////////////////

// Nueva ruta para acceder a graphiql
app.use('/graphql', graphqlHTTP({
        // Que schema va a utilizar
        schema,
        // El resolver se pasa como rootValue
        rootValue: root,
        // Utilizar Graphiql <--
        graphiql: true
    })
);

// Escuchando por el puerto 8000 las peticiones
app.listen(8000, () => console.log('Escuchando por el puerto 8000'));