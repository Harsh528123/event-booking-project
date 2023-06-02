const express = require('express');

const bodyParser = require('body-parser');

const {graphqlHTTP} = require('express-graphql')
/* 
function where express expects a middleware function
takes incoming req and funnel through graphql parser
and automatically forward them to right resolvers
*/
const events = []
const { buildSchema } = require('graphql') // pulls properties from exported object
const app = express();


app.use(bodyParser.json());
// express-graphql allows us to point at schemas and resolvers
// graphql will allow us to define this schema

// exclamatoin means not nullable
// first exclamation point means it will always return a list of strings. Can be empty but not null
// second exclamation means it always returns a list not null.
app.use('/graphql', graphqlHTTP({
    // _id for mongo
    schema: buildSchema(`
    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
    }
    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }
    type RootQuery {
        events : [Event!]!
    }
    type RootMutation {
        createEvent(eventInput: EventInput): Event
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    // input type can be used in arguments
    rootValue: {
        events: () => {
            return events
        },
        createEvent : (args) => {
            const event = {
                _id: Math.random().toString(),
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: args.eventInput.date
            }
            events.push(event)
            return event
        }
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

app.listen(3000);