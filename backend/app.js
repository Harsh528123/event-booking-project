const express = require('express');

const bodyParser = require('body-parser');
const isAuth = require('./middleware/auth-middleware')
const {graphqlHTTP} = require('express-graphql')
/* 
function where express expects a middleware function
takes incoming req and funnel through graphql parser
and automatically forward them to right resolvers
*/

const graphQLSchema = require('./graphql/schema/index')
const graphQLResolvers = require('./graphql/resolvers/index')
const mongoose = require('mongoose')
const app = express();


app.use(bodyParser.json());
// express-graphql allows us to point at schemas and resolvers
// graphql will allow us to define this schema

app.use(isAuth);
// will run on every req

const events = eventIds => {
    return event.find({_id : {$in: eventIds}})
    .then(events => {
        return events.map(event => {
            return {
                ...event._doc, 
                _id: event.id, 
                creator: user.bind(this, event.creator)}
        })
    }

    )
    .catch(err => {
        throw err;
    })
    // all events where id is in 
}
// 
const user = userId => {
    return User.findById(userId)
    .then(user => {
            return { 
                ...user._doc, 
                _id: user.id, 
                createdEvents: events.bind(this, user._doc.createdEvents)}
        })
    .catch(err => {
        throw err; 
    })
}




// exclamatoin means not nullable
// first exclamation point means it will always return a list of strings. Can be empty but not null
// second exclamation means it always returns a list not null.
app.use('/graphql', graphqlHTTP({
    // _id for mongo; below is the graphql schema
    // we dont want password returned so we dont put exclamation on it
    schema: graphQLSchema,
    // input type can be used in arguments
    rootValue: graphQLResolvers,
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