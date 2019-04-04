import { rootReducer } from './index'
import { combineReducers, createStore } from 'redux'
import { notes } from './notes'

describe('rootReducer', () => {
  it('should return a store with all reducers', () => {
    let store = createStore(rootReducer)
    
    expect(store.getState().notes).toEqual(notes(undefined, {}))

  })
})