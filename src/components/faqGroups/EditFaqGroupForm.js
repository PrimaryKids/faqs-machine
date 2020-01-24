import React, { useState }from 'react'
import { useToasts } from 'react-toast-notifications'

const EditFaqGroupForm = props => {
  const { addToast } = useToasts()
  const [faqGroup, setFaqGroup] = useState(props.currentFaqGroup)

  const handleInputChange = event => {
    const { name, value } = event.target
    setFaqGroup({ ...faqGroup, [name]: value })
  }

  const handleDelete = async event => {
    event.preventDefault()
    try {
      await props.deleteFaqGroup(faqGroup.id)
      addToast('FAQ Group successfully deleted', {
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
    const { label, anchor, position } = faqGroup
    try {
      await props.updateFaqGroup({ label, anchor, position })
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
    <form onSubmit={handleSubmit} className='faq-bg-gray faq-p-a-3 faq-m-t-4 faq-m-b-4'>
      <h2 className="faq-title--md">Edit FAQ group details</h2>
      <div className="faq-m-t-4">
        <div className='faq-m-b-4'>
          <label className='faq-title--sm faq-m-b-1'>FAQ group name</label>
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
      </div>

      <div className='faq-d-flex faq-flex-justify-space-between'>
        <button
          className='faq-button faq-button--secondary'
          onClick={handleDelete}
        >
          Delete
        </button>
        <button className='faq-button faq-button--primary'>Save</button>
      </div>
    </form>
  )
}

export default EditFaqGroupForm
