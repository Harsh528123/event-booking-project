import { ApolloServerErrorCode } from '@apollo/server/errors';

/**
 * This function is very important since it handles errors for developers when query does not match schemas
 * @param {*} formattedError 
 * @param {*} error 
 * @returns 
 */
export const formattingError = (formattedError, error) => {
    // Return a different error message
    if (formattedError.extensions.code === ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED) {
        return {
            ...formattedError,
            message: "Your query doesn't match the schema. Try double-checking it!",
        };
    }
    // Otherwise return the formatted error. This error can also
    // be manipulated in other ways, as long as it's returned.
    return formattedError;
}