import React from 'react'

const Faq = ({ faq }) => {
  return (
    <div className='faq-item faq-m-b-3'>
      <div className='faq-title--sm'>{faq.question}</div>
      <span dangerouslySetInnerHTML={{ __html: faq.answer }} />
    </div>
  )
}

export default Faq
