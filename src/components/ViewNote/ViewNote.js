import React from 'react'
import PropTypes from 'prop-types'
import ViewItem from '../ViewItem/ViewItem'
import { Link } from 'react-router-dom'

export const ViewNote = (props) => {

  let { title, items, id } = props.note
  let incompleteItems = items.filter(item => item.completed === false)
  let incompleteElements = incompleteItems.map(item => <ViewItem key={item.id} existingValue={item.value} complete='false' />)
  let completeItems = items.filter(item => item.completed === true)
  let completeElements = completeItems.map(item => <ViewItem key={item.id} existingValue={item.value} complete='true'/>)
  
  return(
    <form>
      <Link to={`/notes/${id}`}>
        <p className='title'>{title}</p>
        {incompleteElements}
        {completeElements}
      </Link>
    </form>
  )
}

ViewNote.propTypes = {
  note: PropTypes.object
}

export default ViewNote