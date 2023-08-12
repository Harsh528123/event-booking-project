import React,{useEffect, useState, useContext} from 'react'
import AuthContext from '../context/auth-context';
import Booking from '../components/Booking/Booking';
import './Bookings.css'
import { useQuery } from '@apollo/client';
import { bookings } from '../queries/queries';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const {token} = useContext(AuthContext);
    const {loading, error, data} = useQuery(bookings)
    if (!loading) {
      setBookings([...data.bookings])
    }

    return (
      <div className='booking'> {bookings.map((booking)=> <Booking setBookings={setBookings} booking={booking} />)}</div>
    )
}

export default Bookings