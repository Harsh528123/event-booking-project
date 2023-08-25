import { ApolloClient, InMemoryCache } from '@apollo/client';

export const defaultClient = new ApolloClient({
    // uri is the endpoint we make queries to (localhost:4000)
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
})