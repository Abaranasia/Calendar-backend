const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const crearUsuario = async (req, res = response) => {   // Register

    console.log('###### Se recibió una petición post de registro');

    const { email, password } = req.body; // Datos recibidos

    try {

        let usuario = await User.findOne({ email }) // Buscamos ese usuario en la DB para validar si existía previamente

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email'
            });
        }

        usuario = new User(req.body); // Creamos un usuario adaptando los datos de req a los campos definidos en el modelo

        //Encriptar contraseña del usuario
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);



        await usuario.save(); // Guardar en la DB es una promesa

        res.status(201).json ({
            ok: true,
            msg: 'User registered',
            uid: usuario.id,
            name: usuario.name
/*             "received data": {
                name,
                email,
                password
            } */
        })
        console.log('###### El registro se satisfizo');

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Internal error. Please contact the administrator'

        })
    }


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