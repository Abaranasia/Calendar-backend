const moment = require('moment');

/**
 * Función que nos permite validar si un dato es de tipo fecha o no
 * @param {*} value 
 * @param {*} param1 
 * @returns 
 */

const isDate = (value, { req, location, path }) => {

    if (!value) {
        return false
    }

    const fecha = moment(value);
    if (fecha.isValid()) {
        return true
    } else {
        return false
    }
}

module.exports = { isDate }
