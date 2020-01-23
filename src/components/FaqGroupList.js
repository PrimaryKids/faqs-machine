import React, { useState, useEffect }  from 'react'
import { transformResponse } from '../utils'
import { Link } from 'react-router-dom'
import AddFaqGroupForm from './AddFaqGroupForm'
import useGlobal from '../store'

const FaqGroupListItem = props => {
  let faqGroup = props.faqGroup

  return (
    <div className='faq-group__row faq-d-flex faq-flex-justify-space-between'>
      <div className='faq-d-flex'>
        <svg className='faq-m-r-3' xmlns='http://www.w3.org/2000/svg' height='30' width='30' viewBox='20 20 60 60'><path d='M73,48.4l-10.4-9.6v4.8H52.4V33.4h4.8L47.6,23l-8.9,10.4h4.8v10.2H33.4v-4.8L23,48.4l10.4,8.9v-4.8h10.2v10.2h-4.8L47.6,73   l9.6-10.4h-4.8V52.4h10.2v4.8L73,48.4z'/></svg>
        <span className='faq-title--sm'>{faqGroup.label}</span>
      </div>
      <Link to={`/faq-groups/${faqGroup.id}`} className='faq-text-link--primary'>Edit</Link>
    </div>
  )
}

const FaqGroupList = () => {
  const [hasError, setErrors] = useState(false)
  const [faqGroups, setFaqGroups] = useState([])
  const [globalState, globalActions] = useGlobal()

  const apiClient = globalState.apiClient

  useEffect(() => {
    apiClient.get('faq_groups')
      .then(transformResponse)
      .then(res => setFaqGroups(res))
      .catch(err => setErrors(err))
  }, [apiClient])

  const createFaqGroup = attrs => {
    return globalState.apiClient.post('faq_groups', { faq_group: attrs })
      .then(transformResponse)
      .then(resp => setFaqGroups([...faqGroups, resp]))
  }

  return (
    <>
      <AddFaqGroupForm createFaqGroup={createFaqGroup} />
      {hasError && <span>error</span>}
      <div className='faq-group faq-m-b-4'>
        {faqGroups.map(faqGroup => {
          return <FaqGroupListItem faqGroup={faqGroup} key={faqGroup.id} />
        })}
      </div>
    </>
  )
}

export default FaqGroupList
