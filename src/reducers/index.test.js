import { rootReducer } from './index'
import { createStore } from 'redux'
import { notes } from './notes'

describe('rootReducer', () => {
  it('should return a store with all reducers', () => {
    let store = createStore(rootReducer)
    expect(store.getState().notes).toEqual(notes(undefined, {}))
  })
})