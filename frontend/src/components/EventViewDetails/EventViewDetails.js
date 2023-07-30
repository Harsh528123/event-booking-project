import React, {useContext} from 'react'
import AuthContext from '../../context/auth-context';


const EventViewDetails = ({selectedEvent,setSelectedViewDetails, setEvents, setSelectedEvent}) => {

    const {token} = useContext(AuthContext);
    const handleCancel = () => {
        setSelectedViewDetails(false);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setSelectedEvent(null);
        setSelectedViewDetails(false);
  
        const requestBody = {
            query: `
                mutation {
                    bookEvent(eventId: "${selectedEvent['_id']}") {
                        _id
                        createdAt
                        updatedAt
                    }
                }`
        }; 
        try {
          const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                // will make sure it fails if we do it incorrectly
                'Content-Type': 'application/json', // backend tries to parse as incoming json
                Authorization: 'Bearer ' + token
                }
          })
  
          if (response.status !== 200 && response.status !== 201){
              throw new Error('Failed!');
          }
          const res = await response.json();
          console.log(res);
        } catch (err) {
          console.log(err);
        }
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