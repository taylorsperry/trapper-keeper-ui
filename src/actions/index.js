export const storeNote = (note) => ({
  type: 'STORE_NOTE',
  note
});

export const storeSavedNotes = (notes) => ({
  type: 'STORE_SAVED_NOTES',
  notes
});

export const deleteNote = (id) => ({
  type: 'DELETE_NOTE',
  id
});

// ACTION IDEAS

// Action to mark item as complete? I think this would 'move' the item to back of array
// export const completeItem = () => {}

// Action to remove a list item?
// export const deleteItem = () => {}

// Action to update a whole note
// export const updateNote = () => {}



// export const isLoading = (bool) => ({
//   type: 'IS_LOADING',
// });


// export const hasError = () => ({
//   type: 'HAS_ERROR',
// });