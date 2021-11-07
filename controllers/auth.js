const { response } = require('express');


const crearUsuario = ( req, res = response ) => {   // Register

    const { name, email, password } = req.body; // Datos recibidos

        res.status(201).json ({
            ok: true,
            msg: 'register',
            "received data": {
                name,
                email,
                password
            }
        })
        
    console.log('###### Se recibió una petición post de registro');
};



const loginUsuario = ( req, res = response ) => {   // Login

    const { email, password } = req.body;

        res.status(200).json ({
            ok: true,
            msg: 'login',
            "logued in as": {
                email,
                password

            }
        })

        console.log(`###### Se recibió una petición post de Login por parte de ${email}`);

};

const revalidarToken =  ( req, res = response ) => {   // Token renew
    console.log('Se recibió una petición get');
    res.json ({
        ok: true,
        msg: 'renew'
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}