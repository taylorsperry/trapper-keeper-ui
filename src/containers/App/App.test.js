import React from 'react'
import { shallow } from 'enzyme'
import ReactDOM from 'react-dom'
import App from './App'
import { mapStateToProps, mapDispatchToProps } from './App'
import { storeSavedNotes } from '../../actions'

describe('App', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <App />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('componentDidMount', () => {
    it('should collect allNotes upon mount', () => {
      
    })

    it('should storeSavedNotes with correct data upon mount', () => {
      
    })
  })

  describe('findNote', () => {
    it('should return a note if note is found', () => {

    })

    it('return an error string if note is not found', () => {

    })
  })

  describe('mapStateToProps', () => {
    it('should return a state object', () => {
      const mockState = {
        notes: [],
        items: [],
        mockState: {}
      }
      const expected = {
        notes: []
      }

      const mockProps = mapStateToProps(mockState)
      expect(mockProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    const mockNotes = [{ title: 'mockNote1', id: '1', items: [{}, {}]}, { title: 'mockNote2', id: '2', items: [{}, {}]}, { title: 'mockNote3', id: '3', items: [{}, {}]}]
    const mockDispatch = jest.fn()
    const actionToDispatch = storeSavedNotes(mockNotes)
    const mappedProps = mapDispatchToProps(mockDispatch)
    mappedProps.storeSavedNotes(mockNotes)
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
  })
})