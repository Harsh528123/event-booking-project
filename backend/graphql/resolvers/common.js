const Event = require('../../models/event');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date')

/**
 * returns all the data for each event given using transformEvent
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

/**
 * For an event with a specific id, it returns its' relevant metadata
 * @param {*} eventId 
 * @returns 
 */
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

/**
 * gets an event object and returns relevant data for it
 * @param {*} event 
 * @returns 
 */
const transformEvent = event => {
    return {
        ...event._doc,
        // ._doc gives all necessary metadata;
        _id: event.id,
        date: dateToString(event._doc.date),
        creator: user.bind(this, event.creator)
        // calls the user function which gets the id and createdEvents of the user
    };
}


const transformBooking = booking => {
    return { 
        ...booking._doc,
        _id: booking.id, 
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)
    }
}


exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
// exports.user = user;
// exports.events = events;
// exports.singleEvent = singleEvent;