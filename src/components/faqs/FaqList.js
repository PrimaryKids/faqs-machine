import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { transformResponse } from '../../utils'
import AddFaqForm from './AddFaqForm'
import DraggableItem from '../shared/DraggableItem'
import useGlobal from '../../store'
import { DndProvider } from 'react-dnd'
import update from 'immutability-helper'
import Backend from 'react-dnd-html5-backend'
import { useToasts } from 'react-toast-notifications'

const FaqList = props => {
  const [error, setErrors] = useState(null)
  const [faqs, setFaqs] = useState([])
  const [globalState] = useGlobal()
  const apiClient = globalState.apiClient
  const { addToast } = useToasts()

  const moveFaqListItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragFaq = faqs[dragIndex]
      setFaqs(
        update(faqs, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragFaq],
          ],
        }),
      )
    },
    [faqs],
  )

  const reorderFaq = (id, position) => {
    apiClient.put(`faqs/${id}/reorder`, {
      faq: { position }
    }).then(() => {
      setErrors(null)
      addToast('Saved Successfully', {
        appearance: 'success',
        autoDismiss: true
      })
    }).catch((e) => {
      setErrors(e.message)
      addToast(e.message, {
        appearance: 'error',
        autoDismiss: true
      })
    })
  }

  const findFaq = id => {
    const faq = faqs.find(fg => fg.id === id)
    return {
      faq,
      index: faqs.indexOf(faq),
    }
  }

  const renderLineItem = (faq) => {
    return (
      <div className='faq-group__row faq-d-flex faq-flex-justify-space-between'>
        <div className='faq-d-flex'>
          <svg className='faq-m-r-3' xmlns='http://www.w3.org/2000/svg' height='30' width='30' viewBox='20 20 60 60'><path d='M73,48.4l-10.4-9.6v4.8H52.4V33.4h4.8L47.6,23l-8.9,10.4h4.8v10.2H33.4v-4.8L23,48.4l10.4,8.9v-4.8h10.2v10.2h-4.8L47.6,73   l9.6-10.4h-4.8V52.4h10.2v4.8L73,48.4z' /></svg>
            <span className='faq-title--sm'>{faq.question}</span>
        </div>
        <Link to={`/faq-groups/${faq.faqGroupId}/faqs/${faq.id}/edit`} className='faq-text-link--primary'>Edit</Link>
      </div>
    )
  }

  const renderFaq = (faq, index) => {
    return (
      <DraggableItem
        key={faq.id}
        index={index}
        id={faq.id}
        item={faq}
        moveItem={moveFaqListItem}
        reorderItem={reorderFaq}
        findItem={findFaq}
        itemType='faq'
        children={renderLineItem(faq)}
      />
    )
  }

  const createFaq = attrs => {
    return globalState.apiClient.post('faqs', { faq: attrs })
      .then(transformResponse)
      .then(resp => setFaqs([...faqs, resp]))
  }

  useEffect(() => {
    setFaqs(props.faqs)
  }, [props.faqs])

  return (
    <>
      <h2 className="faq-title--md">FAQs for </h2>
      <div className='faq-group faq-m-b-4'>
        <DndProvider backend={Backend}>
          <div>{faqs.map((faq, i) => renderFaq(faq, i))}</div>
        </DndProvider>
      </div>
      <AddFaqForm createFaq={createFaq} />
    </>
  )
}

export default FaqList
