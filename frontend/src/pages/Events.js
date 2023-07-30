import React, {useState, useRef, useContext, useEffect} from 'react'
import './Events.css'
import Modal from '../components/Modal/Modal'
import Backdrop from '../components/Backdrop/Backdrop'
import AuthContext from '../context/auth-context'
import Event from '../components/Event/Event'
import EventForm from '../components/EventForm/EventForm'
import EventViewDetails from '../components/EventViewDetails/EventViewDetails'

const Events = () => {
  const [eventModalToggle,setEventModalToggle] = useState(false)
  const [events, setEvents] = useState([]);
  const [selectedViewDetails, setSelectedViewDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  const fetchEvents = async () => {
    const requestBody = {
      query: `
          query {
              events {
                  _id
                  title
                  description
                  price
                  date
                  creator {
                    _id
                    email
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
        }
      })

      if (response.status !== 200 && response.status !== 201){
          throw new Error('Failed!');
      }
      const res = await response.json();
      const events = res.data.events;
      setEvents([...events])
      console.log(res)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, [])

  const handleToggle = async(e) => {
      e.preventDefault();
      setEventModalToggle(!eventModalToggle);
  }

  const handleViewDetailsHandler = (event) => {
    setSelectedViewDetails(true);
    setSelectedEvent(event);
  }
  return (
    <>
            {eventModalToggle && <Backdrop/>}
            {eventModalToggle && 
                <Modal  
                content = {<EventForm setEventModalToggle={setEventModalToggle} eventModalToggle={eventModalToggle} setEvents={setEvents}/>}
                title="Add Event " 
                className='events-control' 
                />}  

            {selectedViewDetails && <Modal 
                title= {selectedEvent.title} 
                content = {<EventViewDetails selectedEvent={selectedEvent} setSelectedViewDetails={setSelectedViewDetails} setEvents={setEvents} setSelectedEvent={setSelectedEvent}/>}
                className='events-control' 
                />} 
            <div className='events-control'>
                <p>Share your own Events!</p>
                <button className='formActionsButton' onClick={handleToggle}> Create Event </button>
            </div>
            <ul className="events__list">
            {events.map((value) => <Event key={value['_id']} event={value} handleFunction={handleViewDetailsHandler} setSelectedViewDetails={setSelectedViewDetails}/>)}
            </ul>
    </>
  )
}

export default Events