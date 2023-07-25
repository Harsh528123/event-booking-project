import React from 'react'
import './Modal.css'

const Modal = ({title, setEventModalToggle, 
      handleSubmit, titleRef, priceRef,
      dateRef, descriptionRef, setSelectedViewDetails}) => {

  const handleCancel = () => {
      setEventModalToggle(false);
      setSelectedViewDetails(false);
  }
  return (
    <div className="modal">
        <header className="modal_header"> 
            <h1> {title} </h1>
        </header>
        <section className="modal_content"> 
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
              </form>
        </section>

        <section className="modal_actions">
            <button className='formActionsButton' onClick={handleCancel}> Cancel </button>
            <button className='formActionsButton' onClick={handleSubmit}> Confirm </button>
        </section>
    </div>
  )
}

export default Modal