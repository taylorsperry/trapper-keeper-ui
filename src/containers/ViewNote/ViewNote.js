import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ViewItem from '../../containers/ViewItem/ViewItem'

export const ViewNote = (props) => {

  let { title, items, id } = props.note
  let existingItems = items.map(item => <ViewItem key={item.id} existingValue={item.value} />)
  
  return(
    <Link to={`/notes/${id}`}>
      <form>
        <p>{title}</p>
        {existingItems}
      </form>
    </Link>
  )
}

ViewNote.propTypes = {
  note: PropTypes.object.isRequired
}

export default ViewNote