import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FaqForm from './FaqForm'

const FaqEdit = () => {
  const [hasError, setErrors] = useState(false)
  const [faq, setFaq] = useState({})
  const { id } = useParams()

  useEffect(() => {
    console.log('faqId: ', id)
    async function fetchData() {
      fetch(`http://localhost:3000/api/v2/faqs/${id}`)
        .then(res => res.json())
        .then(res => setFaq(res))
        .catch(err => setErrors(err))
    }
    fetchData()
  }, [id])

  return (
    <FaqForm
      currentFaq={faq}
    />
  )
}

export default FaqEdit
