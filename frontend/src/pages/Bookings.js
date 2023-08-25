import React,{useEffect, useState, useContext, useRef} from 'react'
import AuthContext from '../context/auth-context';
import Booking from '../components/Booking/Booking';
import { useQuery } from '@apollo/client';
import { bookings } from '../queries/queries';
import './Bookings.css'


const Bookings = () => {
    const [allBookings, setBookings] = useState([]);
    const {clientWithHeader} = useContext(AuthContext);
    const {loading, error, bookingData, refetch}= useQuery(bookings, {onCompleted: (data) => {
      console.log("refetched")
      setBookings([...data.bookings])}, 
            client: clientWithHeader,          
    });
    useEffect(()=> {
      refetch()
    }, [])
    console.log(allBookings)
    return (
      <div className='booking'> 
          {allBookings.map((booking) => <Booking booking={booking} setBookings={setBookings} key={booking['_id']}/>)}
      </div>
    )
}

export default Bookings