import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { transformResponse } from '../utils'
import Faq from './Faq'

const FaqGroup = () => {
  const [hasError, setErrors] = useState(false)
  const [faqGroup, setFaqGroup] = useState({})
  const { faqGroupId } = useParams()

  useEffect(() => {
    async function fetchData() {
      fetch(`http://localhost:3000/api/v2/faq_groups/${faqGroupId}`)
        .then(transformResponse)
        .then(res => setFaqGroup(res))
        .catch(err => setErrors(err))
    }
    fetchData()
  }, [faqGroupId])

  return (
    <>
      <Link to='/'>Back</Link>
      <div className='faq-collection faq-m-b-4'>
        <h2 className='faq-title--md'>{faqGroup.label}</h2>
        {hasError && <div>error</div>}
        {faqGroup.faqs && faqGroup.faqs.map(faq => {
          return <Faq faq={faq} key={faq.id} />
        })}
      </div>
    </>
  )
}

export default FaqGroup
