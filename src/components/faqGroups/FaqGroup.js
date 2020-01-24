import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { transformResponse } from '../../utils'
import EditFaqGroupForm from './EditFaqGroupForm'
import FaqList from '../faqs/FaqList'
import useGlobal from '../../store'

const FaqGroup = () => {
  const [hasError, setErrors] = useState(false)
  const [faqGroup, setFaqGroup] = useState({})
  const [faqs, setFaqs] = useState([])
  const { faqGroupId } = useParams()
  const history = useHistory()
  const [globalState] = useGlobal()

  const apiClient = globalState.apiClient

  const setProps = (data) => {
    setFaqGroup(data)
    setFaqs(data.faqs)
  }

  useEffect(() => {
    async function fetchData() {
      apiClient.get(`faq_groups/${faqGroupId}`)
        .then(transformResponse)
        .then(setProps)
        .catch(setErrors)
    }
    fetchData()
  }, [apiClient, faqGroupId])

  const updateFaqGroup = updatedFaqGroup => {
    return apiClient.put(`faq_groups/${faqGroupId}`, { faq_group: updatedFaqGroup })
      .then(transformResponse)
      .then(setProps)
      .catch(setErrors)
  }

  const deleteFaqGroup = async id => {
    try {
      await apiClient.delete(`faq_groups/${id}`)
      history.push('/')
    } catch (error) {
      setErrors(error)
    }
  }

  return (
    <>
      <Link to='/'>Back</Link>
      <div className='faq-collection faq-m-b-4'>
        {hasError && <div>{hasError.message}</div>}

        {faqGroup.id && <EditFaqGroupForm
          currentFaqGroup={faqGroup}
          updateFaqGroup={updateFaqGroup}
          deleteFaqGroup={deleteFaqGroup}
        />}

        <FaqList faqs={faqs} />
      </div>
    </>
  )
}

export default FaqGroup
