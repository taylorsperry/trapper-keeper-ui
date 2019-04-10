import * as actions from './index'

describe('storeNote', () => {
  it('should take in a note object and return an object with type STORE_NOTE', () => {
    const mockNote = {
      title: 'mockTitle',
      items: [{id: '123', value: 'one'}, {id: '234', value: 'two'}, {id: '345', value: 'three'}]
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
      { id: 'abc', title: 'mock1', items: [ {id: '456', value: 'itemA'}, {id: '678', value: 'itemB'} ] }, 
      { id: '123', title: 'mock2', items: [{ id: '098', value: 'item1'}, {id: '765', value: 'item2'} ] } 
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
})