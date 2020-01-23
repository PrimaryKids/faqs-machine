import React from 'react'
import { Link } from 'react-router-dom'

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

const FaqGroupList = ({ faqGroups }) => {
  return (
    <div>
      {faqGroups.map(faqGroup => {
        return <FaqGroupListItem faqGroup={faqGroup} key={faqGroup.id} />
      })}
    </div>
  )
}

export default FaqGroupList
