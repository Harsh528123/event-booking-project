const Event = require('../../models/event');
const { transformEvent } = require('./common')

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
    }
};