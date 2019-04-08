import React from 'react'
import ViewItem from '../../containers/ViewItem/ViewItem'
import { Link } from 'react-router-dom'

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

export default ViewNote