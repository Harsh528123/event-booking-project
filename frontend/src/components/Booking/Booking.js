import React, {useContext} from 'react'
import AuthContext from '../../context/auth-context';

const Booking = ({booking, setBookings}) => {
  
    const {token} = useContext(AuthContext);
    const handleCancel = async() => {
      const requestBody = {
        query: `
            mutation {
                cancelBooking( bookingId: "${booking['_id']}") {
                    _id
                    title
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
        setBookings(prevState => {
          console.log(prevState)
          const updatedBookings = prevState.filter(currentbooking => {
            return booking['_id'] !== currentbooking['_id']
          });
          return [...updatedBookings];
        })
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
      return (
          <div className='events__list-item'> 
              <section> 
                <p>{booking['createdAt']}</p>
                <p>{booking['event']['title']} </p>
              </section>
              <section>
                <button className='formActionsButton' onClick={handleCancel}> Cancel </button>
              </section>
          </div>
    )
}

export default Booking