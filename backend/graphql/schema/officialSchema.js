
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    type Booking {
        _id: ID!
        event: Event!
        user: User!
        createdAt: String!
        updatedAt: String!
    }

    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        creator: User!
    }

    type User {
            _id: ID!
            email: String!
            password: String
            createdEvents: [Event!]
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
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

    type Query {
        events: [Event!]!
        bookings: [Booking!]!
        login(email: String!, password: String!): AuthData!
    }

    type Mutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
        bookEvent(eventId: ID!): Booking!
        cancelBooking(bookingId: ID!): Event!
    }
`;
// ALL NAMES FOR QUERYS AND MUTATIONS SHOULD MATCH IN RESOLVER NAMES

// date when logged in should be a token, 
// info about when token is about to expire 
// info on user id


// token is used for decoupled frontend and backend
// token is then attached to subsequent requests 
// and we can validate the requests in backend