import React, { useState } from 'react'
import { useToasts } from 'react-toast-notifications'

const EditFaqForm = props => {
  const { addToast } = useToasts()
  const [faq, setFaq] = useState(props.currentFaq)

  const handleInputChange = event => {
    const { name, value } = event.target
    setFaq({ ...faq, [name]: value })
  }

  return (
    <form onSubmit={event => {
      event.preventDefault()
      const { error } = props.updateFaq(faq)
      if (error) {
        addToast(error.message, {
          appearance: 'error',
          autoDismiss: true
        })
      } else {
        addToast('Saved Successfully', {
          appearance: 'success',
          autoDismiss: true
        })
      }
    }}>
      <div className="faq-m-b-4">
        <label className="faq-title--sm faq-m-b-1">Label</label>
        <input
          type="text"
          className="faq-input"
          name="label"
          value={faq.label}
          onChange={handleInputChange}
        />
      </div>
      <div className="faq-m-b-4">
        <label className="faq-title--sm faq-m-b-1">Anchor</label>
        <input
          type="text"
          className="faq-input"
          name="anchor"
          value={faq.anchor}
          onChange={handleInputChange}
        />
      </div>
      <div className="faq-m-b-4">
        <label className="faq-title--sm faq-m-b-1">Question</label>
        <input
          type="text"
          className="faq-input"
          name="question"
          value={faq.question}
          onChange={handleInputChange}
        />
      </div>
      <div className="faq-m-b-4">
        <label className="faq-title--sm faq-m-b-1">Answer</label>
        <textarea
          name="answer"
          className="faq-textarea"
          value={faq.answer}
          onChange={handleInputChange}
        />
      </div>
      <button className="faq-button faq-button--primary">Save</button>
    </form>
  )
}

export default EditFaqForm
