const { Schema, model } = require('mongoose');

const EventSchema = Schema({ // Esquema de los cmapos de la DB
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

// El siguiente método permite personalizar la forma en la que vemos los datos desde la BBDD, pero no los cambia allí
EventSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Event', EventSchema);