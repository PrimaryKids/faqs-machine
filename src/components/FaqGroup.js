import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { transformResponse } from '../utils'
import EditFaqGroupForm from './EditFaqGroupForm'
import Faq from './Faq'

const FaqGroup = () => {
  const [hasError, setErrors] = useState(false)
  const [faqGroup, setFaqGroup] = useState({})
  const [faqs, setFaqs] = useState([])
  const { faqGroupId } = useParams()

  const setProps = (data) => {
    setFaqGroup(data)
    setFaqs(data.faqs)
  }

  useEffect(() => {
    async function fetchData() {
      fetch(`http://localhost:3000/api/v2/faq_groups/${faqGroupId}`)
        .then(transformResponse)
        .then(setProps)
        .catch(setErrors)
    }
    fetchData()
  }, [faqGroupId])

  const updateFaqGroup = updatedFaqGroup => {
    return fetch(`http://localhost:3000/api/v2/faq_groups/${faqGroupId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ faq_group: updatedFaqGroup })
    })
      .then(transformResponse)
      .then(setProps)
      .catch(setErrors)
  }

  return (
    <>
      <Link to='/'>Back</Link>
      <div className='faq-collection faq-m-b-4'>
        {hasError && <div>error</div>}

        {faqGroup.id && <EditFaqGroupForm
          currentFaqGroup={faqGroup}
          updateFaqGroup={updateFaqGroup}
        />}

        {faqs.map(faq => {
          return <Faq faq={faq} key={faq.id} />
        })}
      </div>
    </>
  )
}

export default FaqGroup
