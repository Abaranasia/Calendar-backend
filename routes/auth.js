/**
 * Rutas de Usuarios / Auth
 * host + /api/auth
 */

const {Router } = require ('express');
const router= Router(); 
const { check } = require('express-validator');

const {crearUsuario, loginUsuario, revalidarToken} = require ('../controllers/auth'); // Funciones asociadas a los endpoints

router.post ( 
    '/new', 
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    ],
    crearUsuario ); // Registro de usuario


router.post ( '/', 
    [ // middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    ],
    loginUsuario ); // Login de usuario

router.get ( '/renew', revalidarToken  ); // Token renew

module.exports = router;
