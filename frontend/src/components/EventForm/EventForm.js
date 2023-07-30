import React, {useRef, useContext}  from 'react'
import AuthContext from '../../context/auth-context';

const EventForm = ({setEventModalToggle, eventModalToggle, setEvents}) => {
    const titleRef = useRef("");
    const priceRef = useRef(0);
    const dateRef = useRef();
    const descriptionRef = useRef();
    const {token} = useContext(AuthContext);
    
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

        if (response.status !== 200 && response.status !== 201){
            throw new Error('Failed!');
        }
        const res = await response.json();
        console.log(res);
        setEvents((oldState) => [...oldState, res.data.createEvent])
      } catch (err) {
        console.log(err);
      }
    } 

    const handleCancel = (e) => {
      e.preventDefault();
      console.log("here")
      setEventModalToggle(false);
    }

    return (
      <form>
              <div className='formComponents'> 
                  <label htmlFor="title"> Title </label>
                  <input type="text" id="title" ref={titleRef}></input>
              </div>
              <div className='formComponents'> 
                  <label htmlFor="price"> Price </label>
                  <input type="number" id="price" ref={priceRef}></input>
              </div>
              <div className='formComponents'> 
                  <label htmlFor="Date"> Date </label>
                  <input type="datetime-local" id="date" ref={dateRef}></input>
              </div>
              <div className='formComponents'> 
                  <label htmlFor="Description"> Description </label>
                  <textarea type="text" id="description" rows="4" ref={descriptionRef}></textarea>
              </div>
              <section className="form_actions">
                <button className='formActionsButton' onClick={handleCancel}> Cancel </button>
                <button className='formActionsButton' onClick={handleSubmit}> Confirm </button>
              </section>
      </form>
    )
}

export default EventForm