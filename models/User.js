const { Schema, model } = require('mongoose');

const UserSchema = Schema({ // Esquema de los cmapos de la DB
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true // evitará emails duplicados
    },
    password: {
        type: String,
        require: true
    }
});

module.exports = model('User', UserSchema);