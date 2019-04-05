export const notes = (state = [], action) => {
  switch (action.type) {
    case 'STORE_NOTE':
      return [...state, action.note];
    case 'STORE_SAVED_NOTES':
      return action.notes;
    case 'DELETE_NOTE':
      return state.filter(note => note.id !== action.id);
    default:
      return state;
    }
}