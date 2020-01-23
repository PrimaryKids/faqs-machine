import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { transformResponse } from '../utils'
import EditFaqGroupForm from './EditFaqGroupForm'
import Faq from './Faq'
import AddFaqForm from './AddFaqForm'
import useGlobal from '../store'

const FaqGroup = () => {
  const [hasError, setErrors] = useState(false)
  const [faqGroup, setFaqGroup] = useState({})
  const [faqs, setFaqs] = useState([])
  const { faqGroupId } = useParams()
  const history = useHistory()
  const [globalState, globalActions] = useGlobal()

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

  const createFaq = attrs => {
    return apiClient.post(`faq_groups/${faqGroupId}/faqs`, { faq: attrs })
      .then(transformResponse)
      .then(resp => setFaqs([...faqs, resp]))
  }

  const deleteFaq = async id => {
    try {
      await apiClient.delete(`faqs/${id}`)
      const newFaqsList = faqs.concat()
      const index = newFaqsList.findIndex(faq => faq.id === id)
      newFaqsList.splice(index, 1)
      setFaqs(newFaqsList)
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

        {faqs.map(faq => {
          return <Faq faq={faq} key={faq.id} deleteFaq={deleteFaq} />
        })}
      </div>
      <div className='faq-m-b-4'>
        <AddFaqForm createFaq={createFaq} />
      </div>
    </>
  )
}

export default FaqGroup
