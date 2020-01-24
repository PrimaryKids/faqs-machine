import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { transformResponse } from '../../utils'
import EditFaqForm from './EditFaqForm'
import useGlobal from '../../store'

const FaqEdit = () => {
  const [hasError, setErrors] = useState(false)
  const [faq, setFaq] = useState({})
  const [loading, setLoading] = useState(true)
  const { faqGroupId, faqId } = useParams()
  const history = useHistory()
  const [globalState] = useGlobal()

  const apiClient = globalState.apiClient

  useEffect(() => {
    async function fetchData() {
      apiClient.get(`faqs/${faqId}`)
        .then(transformResponse)
        .then(res => {
          setFaq(res)
          setLoading(false)
        })
        .catch(err => setErrors(err))
    }
    fetchData()
  }, [apiClient, faqId])

  const updateFaq = async (updatedFaq) => {
    const response = await apiClient.put(`faqs/${faqId}`, { faq: updatedFaq })
    return await transformResponse(response)
  }

  const deleteFaq = async id => {
    try {
      await apiClient.delete(`faqs/${id}`)
      history.push(`/faq-groups/${faqGroupId}`)
    } catch (error) {
      setErrors(error)
    }
  }

  return (
    <>
      <Link to={`/faq-groups/${faqGroupId}`} className="faq-d-inline-block faq-text-link--secondary faq-m-b-4">Back to FAQ group</Link>
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
