import React from 'react'

const Faq = ({ faq }) => {
  return (
    <div className='faq-item'>
      <h4>{faq.question}</h4>
      <span dangerouslySetInnerHTML={{ __html: faq.answer }} />
    </div>
  )
}

export default Faq
