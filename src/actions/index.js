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

// export const isLoading = (bool) => ({
//   type: 'IS_LOADING',
// })


// export const hasError = () => ({
//   type: 'HAS_ERROR',
// })