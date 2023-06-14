const authResolver = require('./auth')
const eventsResolver = require('./events');
const bookingResolver = require('./booking')

// a js object that has all resolvers in it
// resolver functions need to match our schema endpoints by name

const rootResolver = {
    ...authResolver,
    ...eventsResolver,
    ...bookingResolver
}

module.exports = rootResolver;