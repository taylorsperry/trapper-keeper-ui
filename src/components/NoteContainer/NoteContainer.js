import React from 'react';
import Note from '../../containers/Note/Note'

export const NoteContainer = (props) => {
  //for each note in the store, use map to render a note component
  // const notes = props.notes.map(note => <Note />)
  return (
    <div>
      <Note />
    </div>
  )
}

export default NoteContainer