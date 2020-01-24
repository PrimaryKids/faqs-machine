import React, { useState, useEffect, useCallback }  from 'react'
import { transformResponse } from '../../utils'
import AddFaqGroupForm from './AddFaqGroupForm'
import FaqGroupListItem from './FaqGroupListItem'
import useGlobal from '../../store'
import { DndProvider } from 'react-dnd'
import update from 'immutability-helper'
import Backend from 'react-dnd-html5-backend'
import { useToasts } from 'react-toast-notifications'

const FaqGroupList = () => {
  const [hasError, setErrors] = useState(false)
  const [faqGroups, setFaqGroups] = useState([])
  const [globalState, globalActions] = useGlobal()
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
      addToast('Saved Successfully', {
        appearance: 'success',
        autoDismiss: true
      })
    }).catch((e) => {
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

  const renderFaqGroup = (faqGroup, index) => {
    return (
      <FaqGroupListItem
        key={faqGroup.id}
        index={index}
        id={faqGroup.id}
        faqGroup={faqGroup}
        moveFaqGroupListItem={moveFaqGroupListItem}
        reorderFaqGroup={reorderFaqGroup}
        findFaqGroup={findFaqGroup}
      />
    )
  }
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
        <DndProvider backend={Backend}>
          <div>{faqGroups.map((faqGroup, i) => renderFaqGroup(faqGroup, i))}</div>
        </DndProvider>
      </div>
    </>
  )
}

export default FaqGroupList
