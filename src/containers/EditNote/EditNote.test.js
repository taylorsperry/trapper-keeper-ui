import React from 'react'
import { shallow } from 'enzyme'
import { EditNote, mapDispatchToProps } from './EditNote'
import { addNote, updateNote, removeNote } from '../../helpers/apiCalls'
import * as actions from '../../actions'

jest.mock('../../helpers/apiCalls')

describe('EditNote', () => {
let wrapper;

  beforeEach(() => {
    Date.now = jest.fn().mockImplementation(() => 6)
    wrapper = shallow(
      <EditNote />
    )
  })
  
  it('should update state for a new note', () => {
    
    let defaultState = {
      id: '',
      items: [
        {
          id: Date.now(),
          value: '',
          completed: false
        }
      ],
      title: '',
      new: true,
    }
    expect(wrapper.instance().componentDidMount())
    expect(wrapper.state()).toEqual(defaultState)
  })

  it('should update state for an existing note', () => {
    let mockProps = {
      id: 18,
      items: [ {id: 7, value: 'list item', completed: false} ],
      title: 'note title',
      new: false,
    }
    
    wrapper = shallow(
      <EditNote {...mockProps} />
    )
    expect(wrapper.instance().componentDidMount())
    expect(wrapper.state()).toEqual(mockProps)
  })

  describe('handleChange', () => {
    it('should update state onChange', () => {
      let initialState = {
        id: 18,
        items: [ {id: 7, value: 'list item', completed: false} ],
        title: 'note title',
        new: false,
      }
      
      wrapper.setState(initialState)
  
      expect(wrapper.state()).toEqual(initialState)

      let mockEvent = {target: {value: 'new title', name: 'title'}}

      let expectedState = {
        id: 18,
        items: [ {id: 7, value: 'list item', completed: false} ],
        title: 'new title',
        new: false,
      }

      wrapper.instance().handleChange(mockEvent)
      expect(wrapper.state()).toEqual(expectedState)
    })
  })

  describe('updateState', () => {
    let mockState;

    beforeEach(() => {
      mockState = {
        id: 18,
        items: [ {id: 7, value: 'list item', completed: false} ],
        title: 'new title',
        new: false,
      }

      wrapper.setState(mockState)
    })

    it('should update an item in state if the passed item matches its id', () => {
      let mockItem = { id: 7, value: 'updated list item', completed: false }

      wrapper.instance().updateState(mockItem)

      expect(wrapper.state().items[0]).toEqual(mockItem)
    })

    it.skip('should add an item with no value to state if the passed item is the last item in the array in state', () => {
      let mockItem = { id: 7, value: 'updated list item', completed: false }
      
      let expectedState = [{ id: 7, value: 'updated list item', completed: false }, {id: 6, value: '', completed: false }]

      wrapper.instance().updateState(mockItem)
      expect(wrapper.state().items).toEqual(expectedState)
    })
  })

  describe('handleSubmit', () => {
    let mockState;

    it('should call editNote() if the value of state.new is set to false', () => {

      mockState = {
        id: 18,
        items: [ {id: 7, value: 'list item', completed: false} ],
        title: 'new title',
        new: false,
      }

      wrapper.setState(mockState)

      expect(wrapper.state()).toEqual(mockState)
      
      let mockEvent = { preventDefault: jest.fn()}

      wrapper.instance().editNote = jest.fn()

      wrapper.instance().handleSubmit(mockEvent)
      
      expect(wrapper.instance().editNote).toHaveBeenCalled()
    })
  
    it('should call sendNote() if the value of state.new is set to true', () => {

      mockState = {
        id: 18,
        items: [ {id: 7, value: 'list item', completed: false} ],
        title: 'new title',
        new: true,
      }

      wrapper.setState(mockState)
      
      expect(wrapper.state()).toEqual(mockState)
      
      let mockEvent = { preventDefault: jest.fn()}

      wrapper.instance().sendNote = jest.fn()

      wrapper.instance().handleSubmit(mockEvent)
      
      expect(wrapper.instance().sendNote).toHaveBeenCalled()
    })

    it('should call handleSubmit on submit click', () => {
      wrapper.instance().handleSubmit = jest.fn()
      let mockEvent = { preventDefault: jest.fn()}
      wrapper.find('.form').simulate('submit', mockEvent)
      expect(mockEvent.preventDefault).toHaveBeenCalled()
    })
  })

  describe('sendNote', () => {
    let mockState;

    beforeEach(() => {
      mockState = {
        id: '',
        items: [ {id: 7, value: 'list item', completed: false} ],
        title: 'new title',
        new: true,
      }

      wrapper.setState(mockState)
    })

    it('should call addNote, which adds the new note to the backend', () => {
      
      let expected = {
        title: mockState.title,
        items: mockState.items
      }

      wrapper.instance().sendNote()

      expect(addNote).toHaveBeenCalledWith(expected)
    })

    it('should call storeNote, which adds the new note to the store', async () => {
      let props = {
        storeNote: jest.fn(),
        history: { push: jest.fn() }
      }

      wrapper = shallow(<EditNote {...props} />)
      let newNote = await wrapper.instance().sendNote()

      expect(wrapper.instance().props.storeNote).toHaveBeenCalledWith(newNote)
    })
  })

  describe('editNote', () => {
    let mockState;

    beforeEach(() => {
      
      mockState = {
        id: 18,
        items: [ {id: 7, value: 'list item', completed: false}, {id: 6, value: '', completed: false} ],
        title: 'new title',
        new: false,
      }

      wrapper.setState(mockState)
    })

    it('should only update state with items that have value', () => {

      let expected = {
        id: mockState.id,
        items: [ {id: 7, value: 'list item', completed: false} ],
        title: mockState.title,
        new: mockState.new,
      }

      wrapper.instance().editNote()

      expect(wrapper.state()).toEqual(expected)
    })

    it('should call updateNote, which updates the note in the backend', () => {

      let expected = {
        id: mockState.id,
        items: [ {id: 7, value: 'list item', completed: false} ],
        title: mockState.title,
      }

      wrapper.instance().editNote()

      expect(updateNote).toHaveBeenCalledWith(expected)
    })

    it('should call storeUpdate, which updates the note in the store', async () => {
      let props = {
        storeUpdate: jest.fn(),
        history: { push: jest.fn() }
      }

      wrapper = shallow(<EditNote {...props} />)

      wrapper.setState(mockState)

      let expected = {
        id: mockState.id,
        items: [ {id: 7, value: 'list item', completed: false} ],
        title: mockState.title,
        new: mockState.new,
      }

      await wrapper.instance().editNote()

      expect(wrapper.instance().props.storeUpdate).toHaveBeenCalledWith(expected)
    })
  })

  describe('deleteItem', () => {
    let mockState;
    let props;

    beforeEach(() => {
      props = {
        storeUpdate: jest.fn()
      }

      wrapper = shallow(<EditNote {...props} />)
      mockState = {
        id: 18,
        items: [ {id: 7, value: 'list item', completed: false}, {id: 8, value: 'item to delete', completed: false}, {id: 6, value: '', completed: false} ],
        title: 'new title',
        new: false,
      }

      wrapper.setState(mockState)
    })

    it('should update state to include only the items with ids that do not match the passed id', () => {
      let id = 8

      let expected = {
        id: 18,
        items: [ {id: 7, value: 'list item', completed: false}, {id: 6, value: '', completed: false} ],
        title: 'new title',
        new: false,
      }

      wrapper.instance().deleteItem(id)
      expect(wrapper.state()).toEqual(expected)
    })

    it('should call updateStore, which removes the item from the backend', async() => {
      let id = 8
      let expected = {
        id: 18,
        items: [ {id: 7, value: 'list item', completed: false} ],
        title: 'new title',
      }

      await wrapper.instance().deleteItem(id)

      expect(updateNote).toHaveBeenCalledWith(expected)
    })

    it.skip('should call storeUpdate, which removes the item from the store', async () => {
      let id = 8
      let expected = {
        id: 18,
        items: [ {id: 7, value: 'list item', completed: false} ],
        title: 'new title',
      }

     wrapper.instance().deleteItem(id)
     await updateNote(expected)

      expect(wrapper.instance().props.storeUpdate).toHaveBeenCalledWith(expected)
    })
  })

  describe('handleDeleteNote', () => {

    let mockState;
    let props;

    beforeEach(() => {
      props = {
        deleteNote: jest.fn(),
        history: {push: jest.fn()}
      }

      wrapper = shallow(<EditNote {...props} />)
      mockState = {
        id: 18,
        items: [ {id: 7, value: 'list item', completed: false}, {id: 8, value: 'item to delete', completed: false}, {id: 6, value: '', completed: false} ],
        title: 'new title',
        new: false,
      }

      wrapper.setState(mockState)
    })

    it('should call deleteNote, which removes the note from the store', () => {
      wrapper.instance().handleDeleteNote(mockState.id)
      expect(wrapper.instance().props.deleteNote).toHaveBeenCalledWith(mockState.id)
    })

    it('should call removeNote, which removes the note from the backend', () => {
      wrapper.instance().handleDeleteNote(mockState.id)
      expect(removeNote).toHaveBeenCalledWith(mockState.id)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should delete a note ', () => {
      let mockId = 1;
      let mockDispatch = jest.fn()
      const actionToDispatch = actions.deleteNote(mockId)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.deleteNote(mockId)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should update an existing note', () => {
      let mockNote = { title: 'mockNote1', id: '1', items: [{}, {}]}
      let mockDispatch = jest.fn()
      const actionToDispatch = actions.storeUpdate(mockNote)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.storeUpdate(mockNote)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should store a new note', () => {
      let mockNote = { title: 'mockNote1', id: '1', items: [{}, {}]}
      let mockDispatch = jest.fn()
      const actionToDispatch = actions.storeNote(mockNote)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.storeNote(mockNote)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })

  describe('checkKey', () => {
    it('should prevent default if keyCode is 13', () => {
      let mockEvent = {keyCode: 13, preventDefault: jest.fn()}
      wrapper.instance().checkKey(mockEvent)

      expect(mockEvent.preventDefault).toBeCalled()
    })

    it('should not prevent default if keyCode is not 13', () => {
      let mockEvent = {keyCode: 11, preventDefault: jest.fn()}
      wrapper.instance().checkKey(mockEvent)

      expect(mockEvent.preventDefault).not.toHaveBeenCalled()
    })
  })
})