import React,{useEffect, useState, useContext, useRef} from 'react'
import AuthContext from '../context/auth-context';
import Booking from '../components/Booking/Booking';
import { useQuery } from '@apollo/client';
import { bookings } from '../queries/queries';
import './Bookings.css'

/**
 * This component returns all bookings fetched from database. Refetch every time screen is loaded. We need authorization to access bookings.
 * @returns
 */
const Bookings = () => {
    const [allBookings, setBookings] = useState([]);
    const {clientWithHeader} = useContext(AuthContext);

    const {loading, error, data, refetch}= useQuery(bookings, {
          onCompleted: (data) => {setBookings([...data.bookings])}, 
          client: clientWithHeader, 
          errorPolicy: "all"
      }
    );

    useEffect(()=> {
      refetch()
    }, [])

    return (
      <div className='booking'> 
          {!loading && allBookings.map((booking) => <Booking booking={booking} setBookings={setBookings} key={booking['_id']}/>)}
          {error && error.graphQLErrors.map(({ message }, i) => (<span key={i}>{message}</span>))}
      </div>
    )
}

export default Bookings