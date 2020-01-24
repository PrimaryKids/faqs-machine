import React from 'react'
import { Link } from 'react-router-dom'

const Faq = props => {
  const { faq } = props

  const handleDelete = () => props.deleteFaq(faq.id)

  return (
    <div className='faq-group__row faq-m-b-3'>
      <div className='faq-title--sm'>{faq.question}</div>
      <span dangerouslySetInnerHTML={{ __html: faq.answer }} />
      <Link to={`/faq-groups/${faq.faqGroupId}/faqs/${faq.id}/edit`} className='faq-button'>
        edit
      </Link>
      <button className='faq-button faq-button--primary' onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default Faq
