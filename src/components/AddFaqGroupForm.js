import React, { useState } from 'react'
import { useToasts } from 'react-toast-notifications'

const AddFaqGroupForm = props => {
  const initialFormState = { label: '', anchor: '', position: null }
  const { addToast } = useToasts()
  const [faqGroup, setFaqGroup] = useState(initialFormState)

  const handleInputChange = event => {
    const { name, value } = event.target
    setFaqGroup({ ...faqGroup, [name]: value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const { label, anchor, position } = faqGroup
    try {
      await props.createFaqGroup({ label, anchor, position })
      addToast('Saved Successfully', {
        appearance: 'success',
        autoDismiss: true
      })
      setFaqGroup(initialFormState)
    } catch (error) {
      addToast(error.message, {
        appearance: 'error',
        autoDismiss: true
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className='faq-m-b-4'>
      <div className='faq-m-b-4'>
        <label className='faq-title--sm faq-m-b-1'>Label</label>
        <input
          type='text'
          className='faq-input'
          name='label'
          value={faqGroup.label}
          onChange={handleInputChange}
        />
      </div>
      <div className='faq-m-b-4'>
        <label className='faq-title--sm faq-m-b-1'>Anchor</label>
        <input
          type='text'
          className='faq-input'
          name='anchor'
          value={faqGroup.anchor}
          onChange={handleInputChange}
        />
      </div>
      <button className='faq-button faq-button--primary'>Save</button>
    </form>
  )
}

export default AddFaqGroupForm
