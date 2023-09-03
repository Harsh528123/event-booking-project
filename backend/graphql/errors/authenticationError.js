import {GraphQLError} from 'graphql'

/**
 * Any time someone tries to create events or bookings without auth token
 */
export const authenticationError = new GraphQLError('You are not authorized to perform this action.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
})

/**
 * Email sign in not valid
 */
export const userNotFound = new GraphQLError('The username email does not exist in the database', {
    extensions: {
        code: 'NOT_FOUND'
    }
})

export const incorrectPassword = new GraphQLError('The inputted password is incorrect', {
    extensions: {
        code: 'BAD_USER_INPUT'
    }
})