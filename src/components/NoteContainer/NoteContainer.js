import React from 'react';
import Note from '../../containers/Note/Note'

export const NoteContainer = (props) => {
  console.log(props.notes)
  const notes = props.notes.map(note => <Note note={note}/>)
  return (
    <div>
      {notes}
    </div>
  )
}

export default NoteContainer