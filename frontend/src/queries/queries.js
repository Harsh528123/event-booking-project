import {gql} from '@apollo/client'

const getAllEvents = gql`
    query getEvents {
        events {
            _id
            title
            description
            price
            date
            creator {
                _id
                email
            }
        }
    }
`

const bookEvent = gql`
    mutation bookEvent($eventId: ID!) {
        bookEvent(eventId: $eventId) {
            _id
            createdAt
            updatedAt
        }
    }
`

const createEvent = gql`
    mutation ($eInput: eventInput!) {
        createEvent(eventInput: $eInput) {
            _id
            title
            description
            price
            date
            creator {
            _id
            email
            }
        }
    }
` 

const login = gql`
    query login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
        }
    }
`

const createUser = gql`
    mutation createUser($uInput: userInput!) {
        createUser(userInput: $uInput): {
            _id
            email
        }
    }
`

const bookings = gql`
    query bookings {
        bookings: {
            _id
            createdAt
            event {
                _id
                title
                date
            }
        }
    }
`

export {getAllEvents, bookEvent, createEvent, login, createUser, bookings}