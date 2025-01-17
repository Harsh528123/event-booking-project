// const Booking = require('../../models/booking');
import { bookingModel } from '../../models/booking.js';
import { transformEvent, transformBooking } from './common.js';
import { eventModel } from '../../models/event.js';
import {authenticationError} from '../errors/authenticationError.js'

export const bookingQueries = {
        bookings: async (parent, args, contextValue, info) => {
            if (!contextValue.isAuth) {
                throw authenticationError
            }
            try {
                const bookings = await bookingModel.find({user: contextValue.userId});
                const arr = bookings.map(booking => {return transformBooking(booking);});
            return arr
            } catch (err) {
                console.log(err)
                throw err;
            }
        }
    }
export const bookingMutations = {
        bookEvent: async (parent, args, contextValue, info) => {
            if (!contextValue.isAuth) {
                throw authenticationError;
            }
            const fetchedEvent = await eventModel.findOne({_id: args.eventId});
            const booking = new bookingModel({
                user: contextValue.userId,
                event: fetchedEvent
            });
            const result = await booking.save();
            return transformBooking(result)
        },
        cancelBooking: async (parent, args, contextValue, info) => {
            if (!contextValue.isAuth) {
                throw authenticationError
            }
            try {
                const booking = await bookingModel.findById(args.bookingId).populate('event')
                // gets event data
                const event = transformEvent(booking.event)
                await bookingModel.deleteOne({_id: args.bookingId});
                return event;
            } catch (err) {
                console.log(err);
            }
        }
}

    
