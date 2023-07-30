import React from 'react'

const Booking = ({booking}) => {
  return (
    <div className='events__list-item'> 
        <section> {booking['_id']}  </section>
        <section> {booking['createdAt']} </section>
        <section> {booking['event']['title']} </section>
    </div>
  )
}

export default Booking