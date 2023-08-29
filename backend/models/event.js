import mongoose from "mongoose";
const Schema = mongoose.Schema;

/**
 * Takes in all necessary basic properties and the creator id as foreign id
 */
const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

export const eventModel = mongoose.model('Event', eventSchema)