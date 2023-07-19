import React from 'react'
import './Modal.css'

const Modal = ({title, children , eventModalToggle, setEventModalToggle, handleSubmit}) => {

  return (
    <div className="modal">
        <header className="modal_header"> 
            <h1> {title} </h1>
        </header>
        <section className="modal_content"> 
            {children}
        </section>

        <section className="modal_actions">
            <button className='formActionsButton' onClick={() => {setEventModalToggle(false)}}> Cancel </button>
            <button className='formActionsButton' onClick={handleSubmit}> Confirm </button>
        </section>
    </div>
  )
}

export default Modal