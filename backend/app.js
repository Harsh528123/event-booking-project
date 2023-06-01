const express = require('express');

const bodyParser = require('body-parser');

const {graphqlHTTP} = require('express-graphql')
/* 
function where express expects a middleware function
takes incoming req and funnel through graphql parser
and automatically forward them to right resolvers
*/

const { buildSchema } = require('graphql') // pulls properties from exported object
const app = express();


app.use(bodyParser.json());
// express-graphql allows us to point at schemas and resolvers
// graphql will allow us to define this schema


// first exclamation point means it will always return a list of strings. Can be empty but not null
// second exclamation means it always returns a list not null.
app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
    type RootQuery {
        events : [String!]!
    }
    type RootMutation {
        createEvent(name: String): String
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue: {
        events: () => {
            return ['Test', 'Test1', 'Test2']
        },
        createEvent : (args) => {
            const eventName = args.name;
            return eventName;
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