const { response } = require('express');
const jwt = require('jsonwebtoken');


const JWTValidator = (req, res, next) => {

    const token = req.header('x-token'); // Leemos x-token del header

    if (!token) { // comprobamos si hay o no token
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {
        const { uid, name } = jwt.verify( // payload desestructurado
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;



    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    next();
}


module.exports = {
    JWTValidator
}