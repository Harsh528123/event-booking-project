const Booking = require('../../models/booking');
const { transformEvent, transformBooking } = require('./common')
const Event = require('../../models/event')

module.exports = {
    bookings: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        try {
            const bookings = await Booking.find()
            return bookings.map(booking => {
                return transformBooking(booking);
            })
        } catch (err) {
            throw err;
        }
    },
    bookEvent: async (args,req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        const fetchedEvent = await Event.findOne({_id: args.eventId});
        const booking = new Booking({
            user: '6486449aec001baf31acb777',
            event: fetchedEvent
        });
        const result = await booking.save();
        return transformBooking(result)
    },
    cancelBooking: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        try {
            const booking = await Booking.findById(args.bookingId).populate('event')
            // gets event data
            const event = transformEvent(booking.event)
            await Booking.deleteOne({_id: args.bookingId});
            return event;
        } catch (err) {
    
        }
    }
}
