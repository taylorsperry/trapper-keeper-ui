import React from 'react';
import ViewNote from '../../containers/ViewNote/ViewNote'

export const NoteContainer = (props) => {
  // console.log(props.notes)
  const notes = props.notes.map(note => <ViewNote key={Date.now()} note={note}/>)
  return (
    <div>
      {notes}
    </div>
  )
}

export default NoteContainer