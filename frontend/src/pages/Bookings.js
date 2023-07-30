import React,{useEffect, useState, useContext} from 'react'
import AuthContext from '../context/auth-context';
import Booking from '../components/Booking/Booking';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const {token} = useContext(AuthContext);

    useEffect(()=> {
      fetchBookings()
    }, [])

    const fetchBookings = async() => {
        const requestBody = {
            query: `
                query {
                    bookings {
                      _id
                      createdAt
                      event {
                        _id
                        title
                        date
                      }
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
      const bookings = res.data.bookings;
      setBookings([...bookings])
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    }
    return (
      <div className='events__list'> {bookings.map((booking)=> <Booking booking={booking} />)}</div>
    )
}

export default Bookings