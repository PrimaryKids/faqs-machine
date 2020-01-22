import React, { useState } from 'react'

const AddFaqForm = props => {
  const initialFormState = {
    id: null,
    anchor: '',
    label: '',
    question: '',
    answer: '',
  }
  const [faq, setFaq] = useState(initialFormState)

  const handleInputChange = event => {
    const { field, value } = event.target

    setFaq({ ...faq, [field]: value })
  }

  return (
    <form onSubmit={event => {
      event.preventDefault()
      props.addFaq(faq)
      setFaq(initialFormState)
    }}>
      <div>
        <label>Anchor</label>
        <input
          type="text"
          name="anchor"
          value={faq.anchor}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Label</label>
        <input
          type="text"
          name="label"
          value={faq.label}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Question</label>
        <input
          type="text"
          name="question"
          value={faq.question}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Answer</label>
        <textarea
          name="answer"
          value={faq.answer}
          onChange={handleInputChange}
        />
      </div>
      <button>Add new FAQ</button>
    </form>
  )
}

export default AddFaqForm
