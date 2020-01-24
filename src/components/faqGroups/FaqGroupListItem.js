import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Link } from 'react-router-dom'
const style = {
  cursor: 'move',
}

const FaqGroupListItem = ({ id, faqGroup, index, moveFaqGroupListItem, reorderFaqGroup, findFaqGroup }) => {
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: 'faqGroupListItem',
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveFaqGroupListItem(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    }
  })
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'faqGroupListItem', id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId } = monitor.getItem()
      const { index: newIndex } = findFaqGroup(faqGroup.id)
      const didDrop = monitor.didDrop()
      if (didDrop) {
        reorderFaqGroup(droppedId, newIndex + 1)
      }
    },
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <div ref={ref} style={{ ...style, opacity }}>
      <div className='faq-group__row faq-d-flex faq-flex-justify-space-between'>
        <div className='faq-d-flex'>
          <svg className='faq-m-r-3' xmlns='http://www.w3.org/2000/svg' height='30' width='30' viewBox='20 20 60 60'><path d='M73,48.4l-10.4-9.6v4.8H52.4V33.4h4.8L47.6,23l-8.9,10.4h4.8v10.2H33.4v-4.8L23,48.4l10.4,8.9v-4.8h10.2v10.2h-4.8L47.6,73   l9.6-10.4h-4.8V52.4h10.2v4.8L73,48.4z' /></svg>
          <span className='faq-title--sm'>{faqGroup.label}</span>
        </div>
        <Link to={`/faq-groups/${faqGroup.id}`} className='faq-text-link--primary'>Edit</Link>
      </div>
    </div>
  )
}
export default FaqGroupListItem
