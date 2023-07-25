import React, {useState, useRef, useContext, useEffect} from 'react'
import './Events.css'
import Modal from '../components/Modal/Modal'
import Backdrop from '../components/Backdrop/Backdrop'
import AuthContext from '../context/auth-context'
import Event from '../components/Event/Event'

const Events = () => {
  const [eventModalToggle,setEventModalToggle] = useState(false)
  const titleRef = useRef("");
  const priceRef = useRef(0);
  const dateRef = useRef();
  const descriptionRef = useRef();
  const {token} = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [selectedViewDetails, setSelectedViewDetails] = useState(false);

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

      if (response.status !== 200 && response.status != 201){
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

  const handleSubmit = async(e) => {
      e.preventDefault();
      setEventModalToggle(!eventModalToggle);
      const event = {
        title: titleRef.current.value,
        price: +priceRef.current.value,
        date: dateRef.current.value,
        description: descriptionRef.current.value
      }
      console.log(event);
      if (event['title'].trim().length === 0 || event['price'] <= 0 || event['date'].trim().length === 0 || event['description'].trim().length === 0) {
        return;
      }

      const requestBody = {
          query: `
              mutation {
                  createEvent(eventInput: {title: "${event['title']}", description: "${event['description']}", price: ${event['price']}, date: "${event['date']}"}) {
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
              Authorization: 'Bearer ' + token
              }
        })

        if (response.status !== 200 && response.status != 201){
            throw new Error('Failed!');
        }
        const res = await response.json();
        console.log(res);
        setEvents((oldState) => [...oldState, res.data.createEvent])
      } catch (err) {
        console.log(err);
      }
  }
  return (
    <>
            {eventModalToggle && <Backdrop/>}
            {eventModalToggle && 
                <Modal setEventModalToggle={setEventModalToggle} 
                eventModalToggle= {eventModalToggle} 
                title="Add Event " 
                className='events-control' 
                handleSubmit={handleSubmit}
                titleRef={titleRef}
                priceRef={priceRef}
                dateRef={dateRef}
                descriptionRef={descriptionRef}
                setSelectedViewDetails={setSelectedViewDetails}
                />}  

            {selectedViewDetails && <Modal setEventModalToggle={setEventModalToggle} 
                eventModalToggle= {eventModalToggle} 
                title="Add Event " 
                className='events-control' 
                handleSubmit={handleSubmit}
                titleRef={titleRef}
                priceRef={priceRef}
                dateRef={dateRef}
                descriptionRef={descriptionRef}
                setSelectedViewDetails={setSelectedViewDetails}
                />} 
            <div className='events-control'>
                <p>Share your own Events!</p>
                <button className='formActionsButton' onClick={handleToggle}> Create Event </button>
            </div>
            <ul className="events__list">
            {events.map((value) => <Event key={value['_id']} event={value} setSelectedViewDetails={setSelectedViewDetails}/>)}
            </ul>
    </>
  )
}

export default Events