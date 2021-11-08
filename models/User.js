const { Schema, model } = require('mongoose');

const UserSchema = Schema({ // Esquema de los cmapos de la DB
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // evitará emails duplicados
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = model('User', UserSchema);