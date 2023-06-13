const bcrypt = require('bcryptjs');

const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');


const transformEvent = event => {
    return {
        ...event._doc,
        // ._doc gives all necessary metadata;
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event.creator)
        // calls the user function which gets the id and createdEvents of the user
    };
}
/*
    {
        ...booking.event._doc,
            _id: booking.event.id,
        creator: user.bind(this, booking.event._doc.creator)
    }
*/

/**
 * 
 * @param {*} eventIds all event ids used to find all events and their data like date and creator. 
 * @returns 
 */
const events = async eventIds => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } });
        return events.map(event => {
            return transformEvent(event);
        });
    } catch (err) {
        throw err;
    }
};


const singleEvent = async eventId => {
    try {
        const event =  await Event.findById(eventId);
        return transformEvent(event);
    } catch (err) {
        throw err;
    }
}


/**
 * 
 * @param {*} userId used to find data of the user in the graphql query
 * @returns 
 */
const user = async userId => {
  try {

    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents)
      // calls the events function with the createdEvents as a parameter and gets their ids. date and creator
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {

    /**
     * This is the graphql query to get all events and the data it returns includes 
     * @returns 
     */
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                return transformEvent(event);
            });
        } catch (err) {
            throw err;
        }
    },
    bookings: async () => {
        try {
            const bookings = await Booking.find()
            return bookings.map(booking => {
                return { 
                    ...booking._doc,
                    _id: booking.id, 
                    user: user.bind(this, booking._doc.user),
                    event: singleEvent.bind(this, booking._doc.event),
                    createdAt: new Date(booking._doc.createdAt).toISOString(),
                    updatedAt: new Date(booking._doc.updatedAt).toISOString()

                };
            })
        } catch (err) {
            throw err;
        }
    },
    /**
     * mutation that will create an event. 
     * @param {*} args 
     * @returns 
     */
    createEvent: async args => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '6486449aec001baf31acb777'
        });
        let createdEvent;
        try {
            const result = await event.save();
            createdEvent = transformEvent(result);
            const creator = await User.findById('6486449aec001baf31acb777');

            if (!creator) {
                throw new Error('User not found.');
            }
            creator.createdEvents.push(event);
            await creator.save();

            return createdEvent;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    createUser: async args => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email });
            if (existingUser) {
            throw new Error('User exists already.');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

            const user = new User({
            email: args.userInput.email,
            password: hashedPassword
            });

            const result = await user.save();

            return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
            throw err;
        }
    },
    bookEvent: async args => {
        const fetchedEvent = await Event.findOne({_id: args.eventId});
        const booking = new Booking({
            user: '6486449aec001baf31acb777',
            event: fetchedEvent
        });
        const result = await booking.save();
        return { 
            ...result._doc,
            _id: result.id,
            user: user.bind(this, booking._doc.user),
            event: singleEvent.bind(this, booking._doc.event),
            createdAt: new Date(booking._doc.createdAt).toISOString(),
            updatedAt: new Date(booking._doc.updatedAt).toISOString()
        
        }
    },
    cancelBooking: async args => {
        try {
            const booking = await Booking.findById(args.bookingId).populate('event')
            // gets event data
            console.log(booking);
            const event = transformEvent(booking.event)
            await Booking.deleteOne({_id: args.bookingId});
            return event;
        } catch (err) {

        }
    }
};


// a js object that has all resolvers in it
// resolver functions need to match our schema endpoints by name

