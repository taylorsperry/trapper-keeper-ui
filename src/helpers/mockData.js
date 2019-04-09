
export const mockNote = {
  id: 2,
  title: 'mockTitle',
  items: [
    {id: '123', value: 'first'},
    {id: '234', value: 'second'},
    {id: '345', value: 'third'}
  ]
}

export const mockProp = {
  note: mockNote
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

export const mockUpdateNote = { 
  id: 4,
  title: 'New Title Four',
  items: ['item4a', 'item4b', 'item4c']
}

export const mockUpdatedNotes = {
  notes: [
  { 
    id: 4,
    title: 'New Title Four',
    items: ['item4a', 'item4b', 'item4c']
  },
  { 
    id: 5,
    title: 'Title Five',
    items: ['item5a', 'item5b']
  },
  { 
    id: 6,
    title: 'Title Six',
    items: ['item6a', 'item6b']
  },
]
}

export const mockBackendNotes = [
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
  { 
    id: 6,
    title: 'Title Six',
    items: ['item6a', 'item6b']
  },
]

export const mockNotesWithDelete = [
  { 
    id: 5,
    title: 'Title Five',
    items: ['item5a', 'item5b']
  },
  { 
    id: 6,
    title: 'Title Six',
    items: ['item6a', 'item6b']
  },
]