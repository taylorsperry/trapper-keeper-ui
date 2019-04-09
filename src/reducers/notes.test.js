import { notes } from './notes'
import * as actions from '../actions'
import { mockBackendNotes, mockAllNotes, mockUpdateNote, mockUpdatedNotes, mockNotesWithDelete } from '../helpers/mockData'

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

  it('should pull notes from the backend and add them to the redux store if action type is STORE_SAVED_NOTES', () => {
    const initialState = []

    const action = actions.storeSavedNotes(mockBackendNotes)
    const result = notes(initialState, action)

    expect(result).toEqual(mockBackendNotes)

  })

  it('should replace a modified note in store if action type is STORE_UPDATE', () => {
    const initialState = mockBackendNotes
    const action = actions.storeUpdate(mockUpdateNote)
    const result = notes(initialState, action)

    expect(result).toEqual(mockUpdatedNotes.notes)
  })

  it('should remove a note from the store if action type is DELETE_NOTE', () => {
    const initialState = mockBackendNotes
    const action = actions.deleteNote(4)

    const result = notes(initialState, action)

    expect(result).toEqual(mockNotesWithDelete)
  })
})