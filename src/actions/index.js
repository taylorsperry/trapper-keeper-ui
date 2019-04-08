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

export const changeItem = (item) => ({
  type: 'CHANGE_ITEM',
  item
})

// ACTION IDEAS

// Action to mark item as complete? I think this would 'move' the item to back of array
// export const completeItem = () => {}

// Action to remove a list item?
// export const deleteItem = () => {}

// export const isLoading = (bool) => ({
//   type: 'IS_LOADING',
// })


// export const hasError = () => ({
//   type: 'HAS_ERROR',
// })