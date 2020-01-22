import React from 'react'
import { Link } from 'react-router-dom'

const Faq = ({ faq }) => {
  return (
    <div className='faq-item faq-m-b-3'>
      <div className='faq-title--sm'>{faq.question}</div>
      <span dangerouslySetInnerHTML={{ __html: faq.answer }} />
      <Link to={`/faqs/${faq.id}/edit`} className='faq-button'>
        edit
      </Link>
    </div>
  )
}

export default Faq
