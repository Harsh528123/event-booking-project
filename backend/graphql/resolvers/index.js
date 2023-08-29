import { userQueries, userMutations } from "./auth.js"
import { bookingQueries, bookingMutations } from "./booking.js"
import { eventMutations, eventQueries } from "./events.js"

// a js object that has all resolvers in it
// resolver functions need to match our schema endpoints by name

export const resolvers = {
    Query: {
        ...userQueries,
        ...bookingQueries,
        ...eventQueries
    },
    Mutation: {
        ...userMutations,
        ...bookingMutations,
        ...eventMutations
    }
}
