import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

import AuthContext from '../context/auth-context'

const Nav = () => {

    const {token} = useContext(AuthContext);

    return (
      <div className='navContainer'>
          <h3> 
              <b> 
                  Event Booking
              </b>  
          </h3>
          <nav className='options'>
              {!token && <li> <Link to={'/auth'}> Authenticate </Link>  </li> }
              <li> <Link to={'/events'}> Events </Link>  </li>
              {token && <li> <Link to={'/bookings'}> Bookings </Link> </li> }
          </nav>
      </div>
    )
}

export default Nav