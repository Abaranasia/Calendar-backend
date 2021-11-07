const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {

    return new Promise((resolve, reject) => {

        const payload = { uid, name }; // almacenamos estos datos en el payload a enviar

        jwt.sign(payload, process.env.SECRET_JWT_SEED, { //firmamos el token con la palabra secreta definida en .env
            expiresIn: '2h' // definimos la duración
        }, (err, token) => { // callback que captura eventual error
            if (err) {
                console.log(err);
                reject('no se pudo generar el token')
            }
            resolve(token) // Resolución de la promesa que devuelve el token correcto
        })

    })
}

module.exports = {
    generateJWT
}