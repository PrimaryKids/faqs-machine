import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { transformResponse } from '../utils'
import EditFaqForm from './EditFaqForm'

const FaqEdit = () => {
  const [hasError, setErrors] = useState(false)
  const [faq, setFaq] = useState({})
  const [loading, setLoading] = useState(true)
  const { faqGroupId, faqId } = useParams()

  useEffect(() => {
    async function fetchData() {
      fetch(`http://localhost:3000/api/v2/faqs/${faqId}`)
        .then(transformResponse)
        .then(res => {
          setFaq(res)
          setLoading(false)
        })
        .catch(err => setErrors(err))
    }
    fetchData()
  }, [faqId])

  const updateFaq = async (updatedFaq) => {
    const response = await fetch(`http://localhost:3000/api/v2/faqs/${faqId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ faq: updatedFaq })
    })
    return await transformResponse(response)
  }

  return (
    <>
      <Link to={`/faq-groups/${faqGroupId}`}>Back</Link>
      <div>
        {hasError && <span>Error</span>}
        { loading ? <span>loading...</span> : <EditFaqForm currentFaq={faq} updateFaq={updateFaq} /> }
      </div>
    </>
  )
}

export default FaqEdit
