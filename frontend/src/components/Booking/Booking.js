import React, {useContext} from 'react'
import AuthContext from '../../context/auth-context';
import { cancelBooking } from '../../queries/queries';
import { useMutation } from '@apollo/client';

const Booking = ({booking, setBookings}) => {
    console.log(setBookings)
    const {clientWithHeader} = useContext(AuthContext);
    const [cancelBookingFunc, {loading, error, bookingData}]= useMutation(cancelBooking, {onCompleted: (data) => {
      setBookings(prevState => {
          const updatedBookings = prevState.filter(currentbooking => {
            return booking['_id'] !== currentbooking['_id']
          });
          return [...updatedBookings];
      })}, 
      client: clientWithHeader,          
    });

    const handleCancel = (e) => {
        cancelBookingFunc({ variables: {id: booking['_id']}})
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