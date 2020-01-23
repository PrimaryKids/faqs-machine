import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { transformResponse } from '../utils'
import EditFaqForm from './EditFaqForm'

const FaqEdit = () => {
  const [hasError, setErrors] = useState(false)
  const [faq, setFaq] = useState({})
  const [loading, setLoading] = useState(true)
  const { faqGroupId, faqId } = useParams()
  const history = useHistory()

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

  const deleteFaq = async id => {
    try {
      await fetch(`http://localhost:3000/api/v2/faqs/${id}`, {
        method: 'DELETE',
        mode: 'cors'
      })
      history.push(`/faq-groups/${faqGroupId}`)
    } catch (error) {
      setErrors(error)
    }
  }

  return (
    <>
      <Link to={`/faq-groups/${faqGroupId}`}>Back</Link>
      <div>
        {hasError && <span>Error</span>}
        { loading
          ? <span>loading...</span>
          : <EditFaqForm
              currentFaq={faq}
              updateFaq={updateFaq}
              deleteFaq={deleteFaq}
            /> }
      </div>
    </>
  )
}

export default FaqEdit
