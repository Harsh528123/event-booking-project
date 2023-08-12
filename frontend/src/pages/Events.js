import React, {useState, useRef, useContext, useEffect} from 'react'
import './Events.css'
import Modal from '../components/Modal/Modal'
import Backdrop from '../components/Backdrop/Backdrop'
import Event from '../components/Event/Event'
import EventForm from '../components/EventForm/EventForm'
import EventViewDetails from '../components/EventViewDetails/EventViewDetails'
import {useQuery} from '@apollo/client'
import { getAllEvents } from '../queries/queries'

const Events = () => {

    const [eventModalToggle,setEventModalToggle] = useState(false)
    const [events, setEvents] = useState([]);
    const [selectedViewDetails, setSelectedViewDetails] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});
    const {loading, error, data} = useQuery(getAllEvents);
    if (!loading) {
        setEvents([...data.events])
    }
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
          {loading === true ?
            <>
              eventModalToggle && <Backdrop/>
              eventModalToggle && 
                  <Modal  
                  content = {<EventForm setEventModalToggle={setEventModalToggle} eventModalToggle={eventModalToggle} setEvents={setEvents}/>}
                  title="Add Event " 
                  className='events-control' 
                  /> 

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
           : <h1> Loading ... </h1>}
      </>
    )
}

export default Events