import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import FaqCollection from './components/FaqCollection'
import './Faq.css'

const App = () => {
  const [hasError, setErrors] = useState(false)
  const [faqs, setFaqs] = useState([])

  useEffect(() => {
    async function fetchData() {
      fetch('http://localhost:3000/api/v2/faqs')
        .then(res => res.json())
        .then(res => setFaqs(res))
        .catch(err => setErrors(err))
    }
    fetchData()
  }, [])

  const byAnchorAndLabel = {}
  faqs.forEach(faq => {
    const base = byAnchorAndLabel[faq.anchor] || { faqs: [] }
    byAnchorAndLabel[faq.anchor] = {
      ...base,
      anchor: faq.anchor,
      label: faq.label,
      faqs: [...base.faqs, faq]
    }
  })

  return (
    <>
      <Header />

      <div className="faq-container">
        {hasError && <div>error</div>}
        {Object.keys(byAnchorAndLabel).map(anchor => {
          return <FaqCollection
                  key={anchor}
                  anchor={anchor}
                  label={byAnchorAndLabel[anchor].label}
                  faqs={byAnchorAndLabel[anchor].faqs}
                />
        })}
      </div>
    </>
  );
}

export default App
