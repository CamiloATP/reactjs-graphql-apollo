import {buildSchema} from 'graphql';

const schema = buildSchema(`
    type Query{
        hola: String
    }
`);

// Para exportarlo a index.js
export default schema;