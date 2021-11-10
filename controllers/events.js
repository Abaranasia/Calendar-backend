const { response } = require('express');
const Event = require('../models/Event');


const getEvents = async (req, res = response) => { // Listar eventos

    const eventos = await Event.find()
        .populate('user', 'name'); // con este método le decimos a mongo que muestre el campo nombre de los usuarios (CA)

    res.json({
        ok: true,
        msg: 'Obtener eventos',
        eventos
    })
}


const createEvent = async (req, res = response) => { // Crear un evento

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


const updateEvent = async (req, res = response) => {  // Actualizar eventos

    const eventId = req.params.id; //Toma el id que llega por la url
    const uid = req.uid; // usuario que lanzó esta opción

    try {
        const evento = await Event.findById(eventId); // Buscamos el evento correspondiente al id solicitado

        if (!evento) { // Entraremos aquí si el id no existe
            return res.status(404).json({
                ok: false,
                msg: "No existe un evento con ese id"
            })
        }

        if (evento.user.toString() !== uid) { //Comprobamos si el usuario que creó el evento es el mismo que lo intenta actualizar
            // Si entramos aquí es que un usuario está intentando modificar el evento de otra persona y eso no debe pasar
            return res.status(401).json({
                ok: true,
                msg: 'El usuario actual no tiene permiso para actualizar este evento',
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Event.findByIdAndUpdate(eventId, nuevoEvento, { new: true }); // new: true imlpica que debe mostrar el evento activo

        res.json({
            ok: true,
            msg: 'Evento actualizado',
            evento: eventoActualizado
        })


    } catch (error) { // Entraremos aquí si el id no tiene formato de Mongo
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Se produjo un error al actualizar el evento. Por favor, hable con el administrador"
        })
    }
}


const deleteEvent = async (req, res = response) => { // Borrar eventos

    const eventId = req.params.id; //Toma el id que llega por la url
    const uid = req.uid; // usuario que lanzó esta opción

    try {
        const evento = await Event.findById(eventId); // Buscamos el evento correspondiente al id solicitado

        if (!evento) { // Entraremos aquí si el id no existe
            return res.status(404).json({
                ok: false,
                msg: "No existe un evento con ese id"
            })
        }

        if (evento.user.toString() !== uid) { //Comprobamos si el usuario que creó el evento es el mismo que lo intenta actualizar
            // Si entramos aquí es que un usuario está intentando modificar el evento de otra persona y eso no debe pasar
            return res.status(401).json({
                ok: true,
                msg: 'El usuario actual no tiene permiso para borrar este evento',
            })
        }

        const eventoActualizado = await Event.findByIdAndDelete(eventId); // new: true imlpica que debe mostrar el evento activo

        res.json({
            ok: true,
            msg: 'Evento eliminado',
            evento: eventoActualizado
        })


    } catch (error) { // Entraremos aquí si el id no tiene formato de Mongo
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Se produjo un error al eliminar el evento. Por favor, hable con el administrador"
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}