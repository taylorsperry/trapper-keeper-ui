import React from 'react';
import Note from '../../containers/Note/Note'

export const NoteContainer = () => {
  //for each note in the store, use map to render a note component
  return (
    <div>
      <Note />
    </div>
  )
}

export default NoteContainer