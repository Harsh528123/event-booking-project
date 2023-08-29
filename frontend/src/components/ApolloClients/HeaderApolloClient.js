import { ApolloClient, InMemoryCache } from '@apollo/client';


/**
 * This is the client given to queries and mutations that need authorization
 * @param {*} token 
 * @returns 
 */
export const clientWithHeader = (token) => {
    console.log(token)
    return new ApolloClient({
        // uri is the endpoint we make queries to (localhost:4000)
        uri: 'http://localhost:4000/graphql',
        cache: new InMemoryCache(),
        headers:    {
                // will make sure it fails if we do it incorrectly
                'Content-Type': 'application/json', // backend tries to parse as incoming json
                Authorization: 'Bearer ' + token
                }
    })
}