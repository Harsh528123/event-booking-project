import React from 'react'
import './Modal.css'

const Modal = ({title, content, }) => {

  console.log(content)
  return (
    <div className="modal">
        <header className="modal_header"> 
            <h1> {title} </h1>
        </header>
        <section className="modal_content"> 
            {content}
        </section>
    </div>
  )
}

export default Modal