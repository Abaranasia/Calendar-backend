const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        mongoose.connect('mongodb://localhost:27017/test');

    } catch (error) {
        console.log(error)
        throw new Error('Error al inicializar la DB');
    }
}