import {gql} from '@apollo/client'

const getAllEvents = gql`
    query GetEvents {
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
    mutation BookEvent($eventId: ID!) {
        bookEvent(eventId: $eventId) {
            _id
            createdAt
            updatedAt
        }
    }
`

const createEvent = gql`
    mutation CreateEvent($eventInput: EventInput!) {
        createEvent(eventInput: $eventInput) {
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
    query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
        }
    }
`

const createUser = gql`
    mutation CreateUser($uInput: UserInput!) {
        createUser(userInput: $uInput) {
            _id
            email
        }
    }
`;

const bookings = gql`
    query Bookings {
        bookings {
            _id
            createdAt
            event {
                _id
                title
                date
            }
        }
    }
`;


const cancelBooking = gql`
    mutation cancelBooking($id: ID!) {
        cancelBooking(bookingId: $id) {
            _id
            title
        }
    }
`

export {getAllEvents, bookEvent, createEvent, login, createUser, bookings, cancelBooking}
