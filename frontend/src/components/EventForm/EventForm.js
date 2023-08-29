import React, {useRef}  from 'react'
import { createEvent } from '../../queries/queries';
import { clientWithHeader } from '../ApolloClients/HeaderApolloClient';
import { useMutation } from '@apollo/client';

const EventForm = ({setEventModalToggle, eventModalToggle, setEvents}) => {
    const titleRef = useRef("");
    const priceRef = useRef(0);
    const dateRef = useRef();
    const descriptionRef = useRef();
    const [createEventFn, { loadingUser, error, createdUserData }] = useMutation(createEvent, {
        errorPolicy: "all",
        onCompleted: (data) => {setEvents((oldState) => [...oldState, data.createEvent])},
        client: clientWithHeader, 
    });

    /**
     * When creating an event, add it to events state 
     * @param {*} e 
     * @returns 
     */
    const handleSubmit = async(e) => {
        e.preventDefault();
        setEventModalToggle(!eventModalToggle);
        
        const event = {
            title: titleRef.current.value,
            price: +priceRef.current.value,
            date: dateRef.current.value,
            description: descriptionRef.current.value
        }
        console.log(event)
        if (event['title'].trim().length === 0 || event['price'] <= 0 || event['date'].trim().length === 0 || event['description'].trim().length === 0) {
            return;
        }
        createEventFn({variables: {eventInput: event}})
    } 

    /**
     * Close event toggle
     * @param {*} e 
     */
    const handleCancel = (e) => {
      e.preventDefault();
      setEventModalToggle(false);
    }

    return (
      <>
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
        {error && error.graphQLErrors.map(({ message }, i) => (<span key={i}>{message}</span>))}

      </>
    )
}

export default EventForm