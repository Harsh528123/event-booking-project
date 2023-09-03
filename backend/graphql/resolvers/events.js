import { eventModel } from '../../models/event.js';
import { transformEvent } from './common.js';
import { userModel } from '../../models/user.js';
import {authenticationError} from '../errors/authenticationError.js'

export const eventQueries = {
        /**
             * This is the graphql query to get all events and the data it returns includes 
             * @returns 
             */
        events: async () => {
            try {
                const events = await eventModel.find();
                return events.map(event => {
                    return transformEvent(event);
                });
            } catch (err) {
                throw err;
            }
        },
    }
export const eventMutations=  {
        /**
         * mutation that will create an event. 
         * @param {*} args 
         * @returns 
         */
        createEvent: async (parent, args, contextValue, info) => {
            try {
                if (!contextValue.isAuth) {
                    throw authenticationError;
                }
                const event = new eventModel({
                    title: args.eventInput.title,
                    description: args.eventInput.description,
                    price: +args.eventInput.price,
                    date: new Date(args.eventInput.date),
                    creator: contextValue.userId
                });
                let createdEvent;
                try {
                    const result = await event.save();
                    createdEvent = transformEvent(result);
                    const creator = await userModel.findById(contextValue.userId);

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