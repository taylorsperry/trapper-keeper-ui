import React from 'react';
import ViewNote from '../../containers/ViewNote/ViewNote'

export const NoteContainer = (props) => {
  console.log(props.notes)
  const notes = props.notes.map(note => <ViewNote note={note}/>)
  return (
    <div>
      {notes}
    </div>
  )
}

export default NoteContainer