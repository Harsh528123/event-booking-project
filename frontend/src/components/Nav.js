import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

const Nav = () => {
  return (
    <div className='navContainer'>
        <h3> 
            <b> 
                Event Booking
            </b>  
        </h3>
        <nav className='options'>
            <li> <Link to={'/auth'}> Authenticate </Link>  </li>
            <li> <Link to={'/events'}> Events </Link>  </li>
            <li> <Link to={'/bookings'}> Bookings </Link> </li>
        </nav>
    </div>
  )
}

export default Nav