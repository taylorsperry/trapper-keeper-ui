import React from 'react';
import Note from '../../containers/Note/Note'

export const NoteContainer = (props) => {
  console.log(props.notes)
  const notes = props.notes.map(note => <Note key={note.id} id={note.id} title={note.title} items={note.items} />)
  return (
    <div>
      {notes}
    </div>
  )
}

export default NoteContainer