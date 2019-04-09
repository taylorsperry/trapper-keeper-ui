export const mockNote = {
  id: 2,
  title: 'mockTitle',
  items: [
    {id: '123', value: 'first'},
    {id: '234', value: 'second'},
    {id: '345', value: 'third'}
  ]
}

export const mockNoteWithoutTitle = {
  title: '',
  items: [
    {id: 'abc', value: 'first'},
    {id: '456', value: 'second'},
    {id: 'tre', value: 'third'}
  ]
}

export const mockNoteWithoutItems = {
  title: 'mockTitle',
  items: [],
}

export const mockEmptyNotes = {
  title: '',
  items: [],
}

export const mockAllNotes = {
  notes: [
  { 
    id: 4,
    title: 'Title Four',
    items: ['item4a', 'item4b']
  },
  { 
    id: 5,
    title: 'Title Five',
    items: ['item5a', 'item5b']
  },
]
}