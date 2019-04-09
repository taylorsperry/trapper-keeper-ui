import React from 'react'
import PropTypes from 'prop-types'
import ViewNote from '../ViewNote/ViewNote'

export const NoteContainer = (props) => {
  const notes = props.notes.map(note => <ViewNote key={note.id} note={note}/>)
  return (
    <div>
      {notes}
    </div>
  )
}

NoteContainer.propTypes = {
  notes: PropTypes.array
}

export default NoteContainer