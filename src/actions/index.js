export const storeNote = (note) => ({
  type: 'STORE_NOTE',
  note
})

export const storeSavedNotes = (notes) => ({
  type: 'STORE_SAVED_NOTES',
  notes
})