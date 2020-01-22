import React from 'react'
import Faq from '../components/Faq'

export default {
  title: 'Faq',
  component: Faq,
}

const faq = {
  id: 1,
  question: "Who is Primary?",
  answer: "We are a small company based in New York, founded by two moms who were previously executives at Diapers.com/Quidsi. We created Primary so that parents everywhere (including ourselves) will have a go-to they can count on for kids clothes from a brand they’ll love.",
  label: "About Primary",
  anchor: "about",
  created_at: "2020-01-21T17:59:35.809-05:00",
  updated_at: "2020-01-21T17:59:35.809-05:00"
}

export const Item = () => <Faq faq={faq} />
