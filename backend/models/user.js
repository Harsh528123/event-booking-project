const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * createdEvents is an array of event ids
 */
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdEvents: [
        {
           type: Schema.Types.ObjectId,
           ref: 'Event'
           // allows us to set up a relationship b/w two models
        }
    ]
});

/*
Two ways users are connected to events:
user creates an event
user books an event
*/

module.exports = mongoose.model('User', userSchema)