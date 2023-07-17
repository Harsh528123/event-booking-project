import React, {useState} from 'react'
import './Events.css'
import Modal from '../components/Modal/Modal'
import Backdrop from '../components/Backdrop/Backdrop'

const Events = () => {
  const [eventModalToggle,setEventModalToggle] = useState(false)
  return (
    <>
            {eventModalToggle && <Backdrop/>}
            {eventModalToggle && 
                <Modal setEventModalToggle={setEventModalToggle} eventModalToggle= {eventModalToggle} title="Add Event " className='events-control'>
                    <p> Modal Content</p>
                </Modal>}   
            <div className='events-control'>
                <p>Share your own Events!</p>
                <button className='formActionsButton' onClick={()=> {setEventModalToggle(!eventModalToggle)}}> Create Event </button>
            </div>
    </>
  )
}

export default Events