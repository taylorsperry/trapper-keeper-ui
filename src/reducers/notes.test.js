import {notes} from './notes'
import * as actions from '../actions'

describe('notes', () => {
  it('should return initial state by default', () => {
    const initialState = []
    const action = {}
    const result = notes(initialState, action)

    expect(result).toEqual(initialState)
  })

  it('should add a note to the notes store if action type is STORE_NOTE', () => {
    const initialState = []
    const mockNote = {
      id: 1,
      title: 'note title',
      items: ['one', 'two', 'three']
    }
    const action = actions.storeNote(mockNote)

    const result = notes(initialState, action)

    expect(result).toEqual([mockNote])
  })
})