import * as actions from './index'

describe('storeNote', () => {
  it('should take in a note object and return an object with type STORE_NOTE', () => {
    const mockNote = {
      title: 'mockTitle',
      items: ['one', 'two', 'three']
    }

    const expected = {
      type: 'STORE_NOTE',
      note: mockNote
    }

    const result = actions.storeNote(mockNote)

    expect(result).toEqual(expected)
  })

  it('should take in all saved notes and return object with type STORE_SAVED_NOTES', () => {
    const mockNotes = [ 
      { id: 'abc', title: 'mock1', items: ['itemA', 'itemB'] }, 
      { id: '123', title: 'mock2', items: ['item1', 'item2']} 
    ]

    const expected = {
      type: 'STORE_SAVED_NOTES',
      notes: mockNotes
    }

    const result = actions.storeSavedNotes(mockNotes)

    expect(result).toEqual(expected)
  })

  it('should take in an id and return object with type DELETE_NOTE', () => {
    const mockId = 123

    const expected = {
      type: 'DELETE_NOTE',
      id: mockId
    } 

    const result = actions.deleteNote(mockId)

    expect(result).toEqual(expected)

  })

  it('should take in a boolean and return an object with type IS_LOADING', () => {
    
  })

  it('should take in a boolean and return an object with type HAS_ERROR', () => {
    
  })

  it('', () => {
    
  })
})