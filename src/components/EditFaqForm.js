import React, { useState } from 'react'
import { useToasts } from 'react-toast-notifications'

const EditFaqForm = props => {
  const { addToast } = useToasts()
  const [faq, setFaq] = useState(props.currentFaq)

  const handleInputChange = event => {
    const { name, value } = event.target
    setFaq({ ...faq, [name]: value })
  }

  const handleDelete = async event => {
    event.preventDefault()
    try {
      await props.deleteFaq(faq.id)
      addToast('FAQ successfully deleted', {
        appearance: 'success',
        autoDismiss: true
      })
    } catch (error) {
      addToast(error.message, {
        appearance: 'error',
        autoDismiss: true
      })
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await props.updateFaq(faq)
      addToast('Saved Successfully', {
        appearance: 'success',
        autoDismiss: true
      })
    } catch (error) {
      addToast(error.message, {
        appearance: 'error',
        autoDismiss: true
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='faq-m-b-4'>
        <label className='faq-title--sm faq-m-b-1'>Question</label>
        <input
          type='text'
          className='faq-input'
          name='question'
          value={faq.question}
          onChange={handleInputChange}
        />
      </div>
      <div className='faq-m-b-4'>
        <label className='faq-title--sm faq-m-b-1'>Answer</label>
        <textarea
          name='answer'
          className='faq-textarea'
          value={faq.answer}
          onChange={handleInputChange}
        />
      </div>

      <div className='faq-d-flex faq-flex-justify-space-between'>
        <button
          className='faq-button faq-button--primary'
          onClick={handleDelete}
        >
          Delete
        </button>
        <button className='faq-button faq-button--primary'>Save</button>
      </div>
    </form>
  )
}

export default EditFaqForm
