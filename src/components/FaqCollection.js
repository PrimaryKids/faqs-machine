import React from 'react'
import Faq from './Faq'

const FaqCollection = ({ anchor, label, faqs }) => {
  return (
    <div className='faq-collection faq-m-b-4'>
      <h2 className='faq-title--md'>{label}</h2>
      {faqs.map(faq => {
        return <Faq key={faq.id} faq={faq} />
      })}
    </div>
  )
}

export default FaqCollection
