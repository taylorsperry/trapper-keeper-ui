import EditItem from './EditItem'
import React from 'react'
import { shallow, mount } from 'enzyme'

describe('EditItem', () => {
  let wrapper

  beforeEach(() => {
    const props = {
      handleChange: jest.fn(),
      handleItem: jest.fn(),
      updateNoteItems: jest.fn(),
      delete: jest.fn(),
      value: 'test',
      id: '123',
      completed: false
    }

    Date.now = jest.fn().mockImplementation(() => 6)
    wrapper = shallow(
      <EditItem {...props}/>
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have a default state set on mount to match props', () => {
    expect(wrapper.state()).toEqual( {value: 'test', id: '123', completed: false} )
  })

  describe('update item', () => {
    it('should update value state onChange and call handleChange', () => {
      const mockState = {
        value: 'he',
        id: 6,
        completed: false,
      }
  
      const mockEvent = {
        target: {
          value: 'hey'
        }
      }
  
      wrapper.setState(mockState)
      expect(wrapper.instance().state).toEqual(mockState)
  
      wrapper.instance().updateItem(mockEvent)
      expect(wrapper.state('value')).toEqual('hey')
    })
  })

  describe('editItem', () => {
    it('should be called when a the correct button is clicked', () => {
      const e = Object.assign(jest.fn(), {preventDefault: () => {}})
      
      wrapper.instance().editItem = jest.fn()
      wrapper.find('.confirm-item').simulate('click', e)
      expect(wrapper.instance().editItem).toBeCalled()
    })

    it('should call updateNoteItems if there is value in the input', () => {
      const mockState = {
        value: 'he',
        id: 6,
        completed: false,
      }
      const mockEmptyState = {
        value: '',
        id: 6,
        completed: false,
      }
      const e = Object.assign(jest.fn(), {preventDefault: () => {}})
      
      wrapper.setState(mockEmptyState)
      wrapper.instance().editItem(e)
      expect(wrapper.instance().props.updateNoteItems).not.toBeCalled()
      
      wrapper.setState(mockState)
      wrapper.instance().editItem(e)
      expect(wrapper.instance().props.updateNoteItems).toBeCalled()
    })
  })

  describe('deleteItem', () => {
    it('should be called when the correct button is clicked', () => {
      const e = Object.assign(jest.fn(), {preventDefault: () => {}})
      wrapper.find('.delete-item').simulate('click', e)
      expect(wrapper.instance().deleteItem).toBeCalled()
    })

    it('should clear state value', () => {
      
    })

    it('should call delete with the correct id', () => {
      
    })
  })

  describe('toggleCompleted', () => {
    it('should be called when the checkbox is changed', () => {
      wrapper.instance().toggleCompleted = jest.fn()
      wrapper.find('.complete-item').simulate('change')
      expect(wrapper.instance().toggleCompleted).toBeCalled()
    })

    it('should toggle state complete', () => {
      const mockState = {
        value: 'he',
        id: 6,
        completed: false,
      }
      const expected = {
        value: 'he',
        id: 6,
        completed: true,
      }
      wrapper.setState(mockState)
      wrapper.instance().toggleCompleted()
      expect(wrapper.state()).toEqual(expected)
    })
  })
})

  // describe('handleItemBlur', () => {
  //   it('should call handleItem with the properties in state', () => {
  //     const mockState = {
  //       value: 'he',
  //       id: 6,
  //       completed: false,
  //     }
  //     wrapper.setState(mockState)
  //     expect(wrapper.instance().state).toEqual(mockState)
  
  //     wrapper.instance().handleItemBlur()
  //     expect(wrapper.instance().props.handleItem).toHaveBeenCalledWith(mockState)
  //   })
  
  //   it('should not call handleItem if the value in state is and empty string', () => {
  //     const mockState = {
  //       value: '',
  //       id: 6,
  //       completed: false,
  //     }
  //     wrapper.setState(mockState)
  //     expect(wrapper.instance().state).toEqual(mockState)
  
  //     wrapper.instance().handleItemBlur()
  //     expect(wrapper.instance().props.handleItem).not.toHaveBeenCalled()
  //   })
  // })