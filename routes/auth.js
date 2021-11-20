/**
 * Rutas de Usuarios / Auth
 * host + /api/auth
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { fieldValidator } = require('../middlewares/field-validator');
const { JWTValidator } = require('../middlewares/jwt-validator');

const {
    crearUsuario,
    loginUsuario,
    revalidarToken
} = require('../controllers/auth'); // Funciones asociadas a los endpoints

const router = Router();


router.post( // Ruta para Registro de usuario
    '/new', 
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener mínimo 6 caracteres').isLength({ min: 6 }),
        fieldValidator
    ],
    crearUsuario);


router.post('/',  // Ruta para login de usuario
    [ // middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener mínimo 6 caracteres').isLength({ min: 6 }),
        fieldValidator
    ],
    loginUsuario);


router.get('/renew', JWTValidator, revalidarToken); // Ruta para Token renew

module.exports = router;
