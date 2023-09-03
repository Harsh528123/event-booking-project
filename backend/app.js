import { ApolloServer } from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone'
import mongoose from 'mongoose';
import { typeDefs } from './graphql/schema/officialSchema.js';
import { resolvers } from './graphql/resolvers/index.js';
import jwt from 'jsonwebtoken'
import { handleAuth } from './middleware/auth-middleware.js';
import { formattingError } from './graphql/errors/formattingError.js';
/* 
function where express expects a middleware function
takes incoming req and funnel through graphql parser
and automatically forward them to right resolvers
*/
const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: formattingError
})

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.xypry9q.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({req, res}) => {
        return handleAuth(req);
    }
});

console.log(`🚀  Server ready at: ${url}`);

// const graphQLSchema = require('./graphql/schema/index')
// const graphQLResolvers = require('./graphql/resolvers/index')
// const mongoose = require('mongoose')
// const app = express();


// app.use(bodyParser.json());
// // express-graphql allows us to point at schemas and resolvers
// // graphql will allow us to define this schema
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
//     if (req.method === 'OPTIONS') {
//         return res.sendStatus(200);
//     }
//     next();

// })

// app.use(isAuth);
// // will run on every req




// // exclamatoin means not nullable
// // first exclamation point means it will always return a list of strings. Can be empty but not null
// // second exclamation means it always returns a list not null.
// app.use('/graphql', graphqlHTTP({
//     // _id for mongo; below is the graphql schema
//     // we dont want password returned so we dont put exclamation on it
//     schema: graphQLSchema,
//     // input type can be used in arguments
//     rootValue: graphQLResolvers,
//     graphiql:true
// }));
// // RootQuery will support real endpoints for the queries
// // you have only one endpoint where everything goes to 
// app.get('/', (req, res, next) => {
//     res.send('Hello World!')
// })

// mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.xypry9q.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`).then(() => {
//     app.listen(4000);
// }).catch(err => {
//     console.log(err);
// })