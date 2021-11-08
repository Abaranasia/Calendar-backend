const { response } = require('express');
const Event = require('../models/Event');


const getEvents = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Obtener eventos'
    })
}


const createEvent = async (req, res = response) => {

    const evento = new Event(req.body);

    try {

        evento.user = req.uid; // Necesitamos el uid del usuario para guardar su nota
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            msg: `Evento creado satisfactoriamente`,
            Evento: eventoGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Se produjo un error al crear el evento. Por favor, hable con el administrador"
        })
    }
}


const updateEvent = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Actualizar evento'
    })
}

const deleteEvent = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Eliminar evento'
    })
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}