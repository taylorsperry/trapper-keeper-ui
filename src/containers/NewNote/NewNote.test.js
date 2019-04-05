import React from 'react';
import {NewNote, mapDispatchToProps} from './NewNote';
import {shallow} from 'enzyme';
import {addNote} from '../../helpers/apiCalls';
import { storeNote } from '../../actions';
import mockNote from '../../helpers/mockData';

jest.mock('../../helpers/apiCalls');

describe('NewNote', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <NewNote />
    )
  })
  //snapshot
  it('should have a default state', () => {
    expect(wrapper.state()).toEqual( {title: '', item: '', items: []} )
  })

  describe('handleChange', () => {
    it('should update the title state upon typing', () => {
      expect(wrapper.state()).toEqual( {title: '', item: '', items: []} )
      const mockEvent = {target:{value: 'typing', name: 'title'}}

      wrapper.instance().handleChange(mockEvent)

      expect(wrapper.state()).toEqual( {title: 'typing', item: '', items: []} )
    })

    it('should update the item state upon typing', () => {
      expect(wrapper.state()).toEqual( {title: '', item: '', items: []} )
      const mockEvent = {target:{value: 'item one', name: 'item'}}

      wrapper.instance().handleChange(mockEvent)

      expect(wrapper.state()).toEqual( {title: '', item: 'item one', items: []} )
    })
  })

  describe('handleBlur', () => {
    it('should update the items state on blur and reset the item state', () => {
      wrapper.setState({title: '', item: 'first item', items: []})

      wrapper.instance().handleBlur()

      expect(wrapper.state()).toEqual( {title: '', item: '', items: ['first item']} )
    })
  })

  describe('sendNote', () => {
    it('should update the api with a new note when a form is submitted', () => {
      const mockState = {title: 'note title', item: '', items: ['first', 'second']}
      const expected = {
        title: mockState.title,
        items: mockState.items
      }

      wrapper.setState(mockState)
      expect(wrapper.state()).toEqual( mockState )

      const mockEvent = {
        preventDefault: jest.fn()
      }

      wrapper.instance().sendNote(mockEvent)

      expect(addNote).toHaveBeenCalledWith(expected)
    })

    // it('should update the store with a new note', async () => {
    //   const props = {
    //     storeNote: jest.fn()
    //   }

    //   const mockEvent = {
    //     preventDefault: jest.fn()
    //   }

    //   await wrapper.instance().sendNote(mockEvent)

    //   expect(props.storeNote).toHaveBeenCalled()
    // })
  })

  describe('mapDispatchToProps', () => {
    const mockDispatch = jest.fn()
    const actionToDispatch = storeNote(mockNote)

    const mappedProps = mapDispatchToProps(mockDispatch)
    mappedProps.storeNote(mockNote)

    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
  })
})