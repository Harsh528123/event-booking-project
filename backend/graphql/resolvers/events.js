const Event = require('../../models/event');
const { transformEvent } = require('./common')
const User  = require('../../models/user');

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
    /**
     * mutation that will create an event. 
     * @param {*} args 
     * @returns 
     */
    createEvent: async (args,req) => {
        try {
            console.log("made it here")
            if (!req.isAuth) {
                throw new Error('Unauthenticated');
            }
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date),
                creator: req.userId
            });
            let createdEvent;
            try {
                const result = await event.save();
                createdEvent = transformEvent(result);
                const creator = await User.findById(req.userId);
    
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
        } catch (err) {
            console.log(err)
            throw err;
        }
    } 
}