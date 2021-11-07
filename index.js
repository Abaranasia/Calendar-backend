const express = require ('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

require('dotenv').config(); // Necesario para leer variables de entorno .env

const app = express(); // Crear servidor Express

const puerto = process.env.PORT; //4000; // Definimos un puerto para el servidor, en este caso <> a 3000 para evitar colisión con el servidor del frontend en local


// Conexión con la base de datos
dbConnection();


// CORS
app.use(cors())

// Directorio público
app.use(express.static('public')) //use es un middleware: función de paso que se ejecuta al hacer una petición


// Lectura y parseo del body
app.use ( express.json() )


// Definición de rutas
app.use('/api/auth', require('./routes/auth'))
// CRUD: Eventos


app.listen(puerto, () => { // Escuchando peticiones 
    console.log(`###### Servidor levantado en el puerto ${puerto} ###### `)
}); 