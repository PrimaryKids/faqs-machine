import React from 'react'
import Faq from './Faq'

const FaqCollection = ({ anchor, label, faqs }) => {
  return (
    <div className='faq-collection'>
      <div className='width-100perc' tabIndex="-1">
        <h3>{label}</h3>
      </div>
      {faqs.map(faq => {
        return <Faq key={faq.id} faq={faq} />
      })}
    </div>
  )
}

export default FaqCollection
