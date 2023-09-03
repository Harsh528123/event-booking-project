import React, {useContext} from 'react'
import AuthContext from '../../context/auth-context';
import { bookEvent } from '../../queries/queries';
import { useMutation } from '@apollo/client';


const EventViewDetails = ({selectedEvent,setSelectedViewDetails, setEvents, setSelectedEvent}) => {


    const {clientWithHeader} = useContext(AuthContext);
    const [bookingEvent, { loading, error, eventData }] = useMutation(bookEvent, {
        client: clientWithHeader,
        onCompleted: (data) => {alert("Booking successfully completed!")}
    });

    /**
     * Cancel the event viewing modal
     */
    const handleCancel = () => {
        setSelectedViewDetails(false);
    }

    /**
     * Get rid of the view modal and book event
     * @param {*} e 
     */
    const handleSubmit = async(e) => {
        e.preventDefault();
        setSelectedEvent(null);
        setSelectedViewDetails(false);
        bookingEvent({ variables: { eventId: `${selectedEvent['_id']}` }})
  
    }
  

    return (
        <section>
            <h1> {selectedEvent.price} </h1>
            <h1> {selectedEvent.description} </h1>
            <button className='formActionsButton' onClick={handleCancel}> Cancel </button>
            <button className='formActionsButton' onClick={handleSubmit}> Book </button>

        </section>
    )
}

export default EventViewDetails