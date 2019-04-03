export const notes = (state = [], action) => {
  switch (action.type) {
    case 'STORE_NOTE':
      return [...state, action.note]
    default:
      return state;
    }
}