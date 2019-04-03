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
})