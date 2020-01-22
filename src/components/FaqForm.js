import React, { useState } from 'react'

const FaqForm = props => {
  const initialFormState = {
    id: null,
    anchor: '',
    label: '',
    question: '',
    answer: '',
  }
  const [faq, setFaq] = useState(initialFormState)

  const handleInputChange = event => {
    const { name, value } = event.target
    setFaq({ ...faq, [name]: value })
  }

  return (
    <form onSubmit={event => {
      event.preventDefault()
      props.addFaq(faq)
      setFaq(initialFormState)
    }}>
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
      <button className="faq-button faq-button--primary">Add new FAQ</button>
    </form>
  )
}

export default FaqForm
