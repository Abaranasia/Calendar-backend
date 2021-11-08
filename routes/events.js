/**
 * Rutas de los eventos / Events
 * host + /api/events
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { fieldValidator } = require('../middlewares/field-validator');
const { JWTValidator } = require('../middlewares/jwt-validator');
const { isDate } = require('../helpers/isDate');

const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/events');

const router = Router();
router.use(JWTValidator); // así empleo el middleware para validar todas las rutas

router.get('/',  //  Obtener eventos
    getEvents);


router.post('/',  //  Crear evento
    [ // middlewares
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Es necesaria una fecha de inicio').custom(isDate),
        check('end', 'Es necesaria una fecha de fin').custom(isDate),
        fieldValidator
    ],
    createEvent);


router.put('/:id',  //  Actualizar evento
    updateEvent);


router.delete('/:id',  //  Eliminar evento
    deleteEvent);


module.exports = router;