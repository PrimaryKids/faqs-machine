import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EditFaqForm from './EditFaqForm'

const FaqEdit = () => {
  const [hasError, setErrors] = useState(false)
  const [faq, setFaq] = useState({})
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    async function fetchData() {
      fetch(`http://localhost:3000/api/v2/faqs/${id}`)
        .then(res => res.json())
        .then(res => {
          setFaq(res)
          setLoading(false)
        })
        .catch(err => setErrors(err))
    }
    fetchData()
  }, [id])

  const updateFaq = async (updatedFaq) => {
    const response = await fetch(`http://localhost:3000/api/v2/faqs/${id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ faq: updatedFaq })
    })
    return await response.json()
  }

  return (
    <div>
      { loading ? <span>loading...</span> : <EditFaqForm currentFaq={faq} updateFaq={updateFaq} /> }
    </div>
  )
}

export default FaqEdit
