import React, { useState, useEffect }  from 'react'
import { transformResponse } from '../utils'
import { Link } from 'react-router-dom'
import AddFaqGroupForm from './AddFaqGroupForm'

const FaqGroupListItem = props => {
  let faqGroup = props.faqGroup

  return (
    <div>
      <span>move me icon</span>
      <span>{faqGroup.label}</span>
      <Link to={`/faq-groups/${faqGroup.id}`}>edit</Link>
    </div>
  )
}

const FaqGroupList = () => {
  const [hasError, setErrors] = useState(false)
  const [faqGroups, setFaqGroups] = useState([])

  useEffect(() => {
    async function fetchData() {
      fetch('http://localhost:3000/api/v2/faq_groups')
        .then(transformResponse)
        .then(res => setFaqGroups(res))
        .catch(err => setErrors(err))
    }
    fetchData()
  }, [])

  const createFaqGroup = attrs => {
    return fetch(`http://localhost:3000/api/v2/faq_groups`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ faq_group: attrs })
    })
      .then(transformResponse)
      .then(resp => setFaqGroups([...faqGroups, resp]))
  }

  return (
    <>
      <AddFaqGroupForm createFaqGroup={createFaqGroup} />
      {hasError && <span>error</span>}
      <div>
        {faqGroups.map(faqGroup => {
          return <FaqGroupListItem faqGroup={faqGroup} key={faqGroup.id} />
        })}
      </div>
    </>
  )
}

export default FaqGroupList
