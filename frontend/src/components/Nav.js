import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
import { useNavigate } from 'react-router-dom'

import AuthContext from '../context/auth-context'

const Nav = () => {

    const {token, logout} = useContext(AuthContext);
    const navigate = useNavigate();
    /**
     * Go back to auth page and reset token and other login data using logout from context
     */
    const handleLogout = () => {
        logout();
        navigate('/auth')
    }
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
                {token && <li> <button onClick={handleLogout} className='button' style={{borderRadius:"5px"}}> Logout </button></li>}
            </nav>
      </div>
    )
}

export default Nav