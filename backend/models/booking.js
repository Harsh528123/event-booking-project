import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * Takes an event id as a foreign key and 
 * takes a user id as a foreign key
 */
const bookingSchema = new Schema({
    event : {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true});
// mongoose will automatically have a created@ and updated@


export const bookingModel = mongoose.model('Booking', bookingSchema);