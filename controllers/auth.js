const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');




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


        // Guardar en la DB es una promesa
        await usuario.save();


        // Generar JWT
        const token = await generateJWT(usuario.id, usuario.name);

        res.status(201).json ({
            ok: true,
            msg: 'User registered',
            uid: usuario.id,
            name: usuario.name,
            token
        });

        console.log('###### El registro se satisfizo');

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Internal error. Please contact the administrator'
        })
    }


};



const loginUsuario = async (req, res = response) => {   // Login

    console.log(`###### Se recibió una petición post de Login`);
    const { email, password } = req.body;

    try {

        const usuario = await User.findOne({ email }) // Buscamos ese usuario en la DB para validar si existía previamente

        if (!usuario) { // El usuario con el que se intenta loguear no existe
            return res.status(400).json({
                ok: false,
                msg: 'usuario o contraseña incorrectos'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password); //comparamos los passwords

        if (!validPassword) {  // Las contraseñas no coinciden
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto',
            });
        }

        // Generar JWT
        const token = await generateJWT(usuario.id, usuario.name);

        res.status(200).json({  // usuario logueado correctamente
            ok: true,
            msg: 'usuario logueado correctamente',
            uid: usuario.id,
            name: usuario.name,
            token
        });

        console.log(`###### Login de ${email} realizado con éxito`);

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Internal error. Please contact the administrator'

        })
    }
};




const revalidarToken = async (req, res = response) => {   // Token renew
    console.log('(`###### Se recibió una petición get');
    const { uid, name } = req;

    // Generar nuevo JWT y retornarlo en esta petición
    const token = await generateJWT(uid, name);

    res.json ({
        ok: true,
        msg: 'token renewed',
        uid,
        name,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}