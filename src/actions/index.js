export const storeNote = (note) => ({
  type: 'STORE_NOTE',
  note
})

export const storeSavedNotes = (notes) => ({
  type: 'STORE_SAVED_NOTES',
  notes
})

export const deleteNote = (id) => ({
  type: 'DELETE_NOTE',
  id
})

export const storeUpdate = (updatedNote) => ({
  type: 'STORE_UPDATE',
  updatedNote
})