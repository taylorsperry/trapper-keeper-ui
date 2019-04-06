import React from 'react'
import ViewItem from '../../containers/ViewItem/ViewItem'
import { Link } from 'react-router-dom'

export const ViewNote = (props) => {

    let { title, items, id } = props.note
    let existingItems = items.map(item => <ViewItem key={item.id} existingValue={item.value} />)
    
    return(
      <form>
        <Link to={`/notes/${id}`}>
        <p>{title}</p>
        {existingItems}
        </Link>
      </form>
    )
  
}

export default ViewNote

