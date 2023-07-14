import React from 'react'
import './Events.css'
import Modal from '../components/Modal/Modal'

const Events = () => {
  return (
    <>
            <Modal title="Add Event "
                        canCancel
                        canConfirm
                        className='events-control'
            >
                <p> Modal Content</p>
            </Modal>
            <div className='events-control'>
                <button className='formActionsButton'> Create Event </button>
            </div>
    </>
  )
}

export default Events