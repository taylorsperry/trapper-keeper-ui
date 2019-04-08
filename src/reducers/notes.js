export const notes = (state = [], action) => {
  switch (action.type) {

    case 'STORE_NOTE':
      return [...state, action.note];

    case 'STORE_SAVED_NOTES':
      return action.notes;

    case 'STORE_UPDATE':
      return state.map(note => {
        if (note.id === action.updatedNote.id) {
          note = action.updatedNote
        }
        return note;
      })

    case 'DELETE_NOTE':
      return state.filter(note => note.id !== action.id);
    
    case 'CHANGE_ITEM':
      return state.map(note => {
        if(note.id == action.item.noteId) {
           return note.items.map(item => {
            if(item.id === action.id) {
              item.value = action.item.value
            }
            return item;
          })
        }
        return note;
      })
      
    default:
      return state
    }
}