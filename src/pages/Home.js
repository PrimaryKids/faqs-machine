import React, { useState, useEffect } from 'react'
import { transformResponse } from '../utils'
import FaqGroupList from '../components/FaqGroupList'

const Home = () => {
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

  return (
    <>
      {hasError && <div>error</div>}
      <FaqGroupList faqGroups={faqGroups} />
    </>
  )
}

export default Home
