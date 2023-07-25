import React, {useContext} from 'react'
import './Event.css'
import AuthContext from '../../context/auth-context'

const Event = ({event, setSelectedViewDetails}) => {
    const {userId} = useContext(AuthContext);
    console.log(userId);
    return (
    <div className='events__list-item'>
        <section>
            <span> <b> {event['title']} </b> </span>
            <span> ${event['price']}</span>
        </section>

        <section>
            <button className='formActionsButton' onClick={()=> setSelectedViewDetails(true)}> View Details </button>
            {userId === event['creator']['_id']? <p> You are the user </p> : null}
        </section>
    </div>
    )
}

export default Event