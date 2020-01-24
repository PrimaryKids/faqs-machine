import React, { useState, useEffect, useCallback }  from 'react'
import { Link } from 'react-router-dom'
import { transformResponse } from '../../utils'
import AddFaqGroupForm from './AddFaqGroupForm'
import DraggableItem from '../shared/DraggableItem'
import useGlobal from '../../store'
import { DndProvider } from 'react-dnd'
import update from 'immutability-helper'
import Backend from 'react-dnd-html5-backend'
import { useToasts } from 'react-toast-notifications'

const FaqGroupList = () => {
  const [error, setErrors] = useState(false)
  const [faqGroups, setFaqGroups] = useState([])
  const [globalState] = useGlobal()
  const apiClient = globalState.apiClient
  const { addToast } = useToasts()

  const moveFaqGroupListItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragFaqGroup = faqGroups[dragIndex]
      setFaqGroups(
        update(faqGroups, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragFaqGroup],
          ],
        }),
      )
    },
    [faqGroups],
  )

  const reorderFaqGroup = (id, position) => {
    apiClient.put(`faq_groups/${id}/reorder`, {
      faq_group: { position }
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

  const findFaqGroup = id => {
    const faqGroup = faqGroups.find(fg => fg.id === id)
    return {
      faqGroup,
      index: faqGroups.indexOf(faqGroup),
    }
  }

  const renderLineItem = (faqGroup) => {
    return (
      <div className='faq-group__row faq-d-flex faq-flex-justify-space-between'>
        <div className='faq-d-flex'>
          <svg className='faq-m-r-3' xmlns='http://www.w3.org/2000/svg' height='30' width='30' viewBox='20 20 60 60'><path d='M73,48.4l-10.4-9.6v4.8H52.4V33.4h4.8L47.6,23l-8.9,10.4h4.8v10.2H33.4v-4.8L23,48.4l10.4,8.9v-4.8h10.2v10.2h-4.8L47.6,73   l9.6-10.4h-4.8V52.4h10.2v4.8L73,48.4z' /></svg>
          <span className='faq-title--sm'>{faqGroup.label}</span>
        </div>
        <Link to={`/faq-groups/${faqGroup.id}`} className='faq-text-link--primary'>Edit</Link>
      </div>
    )
  }

  const renderFaqGroup = (faqGroup, index) => {
    return (
      <DraggableItem
        key={faqGroup.id}
        index={index}
        id={faqGroup.id}
        item={faqGroup}
        moveItem={moveFaqGroupListItem}
        reorderItem={reorderFaqGroup}
        findItem={findFaqGroup}
        itemType='faqGroup'
        children={renderLineItem(faqGroup)}
      />
    )
  }

  const createFaqGroup = attrs => {
    return globalState.apiClient.post('faq_groups', { faq_group: attrs })
      .then(transformResponse)
      .then(resp => setFaqGroups([...faqGroups, resp]))
  }

  useEffect(() => {
    apiClient.get('faq_groups')
      .then(transformResponse)
      .then(res => setFaqGroups(res))
      .catch(err => setErrors(err))
  }, [apiClient])

  return (
    <>
      <h2 className="faq-title--md">FAQ groups</h2>
      <div className='faq-group faq-m-b-4'>
        <DndProvider backend={Backend}>
          <div>{faqGroups.map((faqGroup, i) => renderFaqGroup(faqGroup, i))}</div>
        </DndProvider>
      </div>
      <AddFaqGroupForm createFaqGroup={createFaqGroup} />
    </>
  )
}

export default FaqGroupList
