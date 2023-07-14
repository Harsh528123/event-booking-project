import React from 'react'
import './Modal.css'

const Modal = ({title, children, canCancel, canConfirm}) => {
  return (
    <div className="modal">
        <header className="modal_header"> 
            <h1> {title} </h1>
        </header>
        <section className="modal_content"> 
            {children}
        </section>

        <section className="modal_actions">
            {canCancel && <button> Cancel </button>}
            {canConfirm && <button> Confirm </button>}
        </section>
    </div>
  )
}

export default Modal