const express = require('express');

const bodyParser = require('body-parser');

const {graphqlHTTP} = require('express-graphql')

const bcrypt = require('bcryptjs');
/* 
function where express expects a middleware function
takes incoming req and funnel through graphql parser
and automatically forward them to right resolvers
*/
const mongoose = require('mongoose')
const Event = require('./models/event');
const User = require('./models/user');
const { buildSchema } = require('graphql') // pulls properties from exported object
const app = express();


app.use(bodyParser.json());
// express-graphql allows us to point at schemas and resolvers
// graphql will allow us to define this schema

// exclamatoin means not nullable
// first exclamation point means it will always return a list of strings. Can be empty but not null
// second exclamation means it always returns a list not null.
app.use('/graphql', graphqlHTTP({
    // _id for mongo; below is the graphql schema
    // we dont want password returned so we dont put exclamation on it
    schema: buildSchema(`

    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    type User {
        _id: ID!
        email: String!
        password: String
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input UserInput {
        email: String!
        password: String!
    }

    type RootQuery {
        events : [Event!]!
    }

    type RootMutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    // input type can be used in arguments
    rootValue: {
        events: () => {
            return Event.find().then(events => {
                return events.map(event => {
                    return {...event._doc, _id: event._doc._id.toString()};
                })
            }).catch(err => {
                throw err;
            })
        },
        createEvent: args => {
            // const event = {
            //     _id: Math.random().toString(),
            //     title: args.eventInput.title,
            //     description: args.eventInput.description,
            //     price: +args.eventInput.price,
            //     date: args.eventInput.date
            // }
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date),
                creator: '6484a17aabc8c14166085882'
            });
            let createdEvent; 
            return event
                .save()
                .then(result => {
                    createdEvent = { ...result._doc, _id: result._doc._id.toString() }
                    return User.findById('6484a17aabc8c14166085882')
                })
                .then(user => {
                    if (!user) {
                        throw new Error('User not found.');
                    }
                    user.createdEvents.push(event);
                    return user.save();
                })
                .then(result => {
                    return createdEvent;
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
        },
        createUser: args => {
            return User.findOne({email: args.userInput.email}).then(
                user => {
                    // will always end up in the then block unless we have a correction error
                    if (user) {
                        throw new Error('User exists already.')
                    } else {
                        return bcrypt.hash(args.userInput.password, 12)
                        .then(hashedPassword => {
                            const user = new User({
                                email: args.userInput.email,
                                password: hashedPassword,
                            });
                            return user.save()
                            }).then(result => {
                                return {...result._doc, _id: result.id, password: null};
                            }).catch(err => {
                                console.log(err);
                                throw err;
                            })
                        .catch(err => {
                            throw err;
                        })
                    }
                }
            )}
        // a js object that has all resolvers in it
        // resolver functions need to match our schema endpoints by name
    },

    graphiql:true
}));
// RootQuery will support real endpoints for the queries
// you have only one endpoint where everything goes to 
app.get('/', (req, res, next) => {
    res.send('Hello World!')
})

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.xypry9q.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`).then(() => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
})