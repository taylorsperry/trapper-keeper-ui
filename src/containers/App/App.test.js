import React from 'react'
import { shallow, mount } from 'enzyme'
import ReactDOM from 'react-dom'
import {App} from './App'
import { mapStateToProps, mapDispatchToProps } from './App'
import { storeSavedNotes } from '../../actions'
import { getNotes } from '../../helpers/apiCalls'
import {mockBackendNotes, mockUpdatedNotes } from '../../helpers/mockData'
import { EditNote } from '../EditNote/EditNote'
import { connect } from 'react-redux'
import { MemoryRouter } from 'react-router'

jest.mock('../../helpers/apiCalls')
jest.mock('../../actions')

describe('App', () => {
  let wrapper
  let mockNotes
  let props
  beforeEach(() => {
    props = mockUpdatedNotes
    wrapper = shallow(
      <App {...props} match={{params: {id: 1}, isExact: true, path: "", url: ""}}/>
    )

    
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('componentDidMount', () => {
    it('should collect allNotes upon mount', async () => {
      wrapper.instance().componentDidMount();
      await expect(getNotes).toHaveBeenCalled()
      expect(storeSavedNotes).toHaveBeenCalledWith(mockNotes)
    })
  })

  describe('findNote', () => {
    it.skip('should return a note if note is found', () => {
      let match = {params: {id: 1}, isExact: true, path: "", url: ""}
      let wrapper = mount(
        <MemoryRouter initialEntries={['/notes/1']} >
          <App />
        </MemoryRouter>
      )

      expect(wrapper.find(EditNote)).toHaveLength(1)
    })

    it('return an error string if note is not found', () => {
      let match = {params: {id: 14}, isExact: true, path: "", url: ""}
      let result = wrapper.instance().findNote({match})
      expect(result).toEqual('404 no note found!')
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
    mockNotes = [{ title: 'mockNote1', id: '1', items: [{}, {}]}, { title: 'mockNote2', id: '2', items: [{}, {}]}, { title: 'mockNote3', id: '3', items: [{}, {}]}]
    const mockDispatch = jest.fn()
    const actionToDispatch = storeSavedNotes(mockNotes)
    const mappedProps = mapDispatchToProps(mockDispatch)
    mappedProps.storeSavedNotes(mockNotes)
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
  })
})