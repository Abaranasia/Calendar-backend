const { response } = require ('express');
const { validationResult } = require ('express-validator');


const manejoErrores = (req, res) => {

    
    // Manejo de errores mediante express-validator
    const errors = validationResult ( req );
    if ( !errors.isEmpty() ) {
        console.log(errors);
        return res.status(400).json ({
            ok: false,
            errors: errors.mapped()
        });
    }
}

const crearUsuario = ( req, res = response ) => {   // Register

    const { name, email, password } = req.body; // Datos recibidos

    if (!manejoErrores(req, res)) {      

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
    }
};



const loginUsuario = ( req, res = response ) => {   // Login

    const { email, password } = req.body;

    if (!manejoErrores(req, res)) { 

        res.status(200).json ({
            ok: true,
            msg: 'login',
            "logued in as": {
                email,
                password

            }
        })

        console.log(`###### Se recibió una petición post de Login por parte de ${email}`);
    }  
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