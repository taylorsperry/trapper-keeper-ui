import EditItem from './EditItem'
import React from 'react'
import { shallow, mount } from 'enzyme'

describe('EditItem', () => {
  let wrapper
  let props

  beforeEach(() => {
    props = {
      moveCompleted: jest.fn(),
      updateItem: jest.fn(),
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

  describe('deleteItem', () => {
    it('should be called when the correct button is clicked', () => {
      let mockEvent = { preventDefault: jest.fn() }
      wrapper.find('.delete').simulate('click', mockEvent)
      expect(wrapper.instance().props.delete).toHaveBeenCalled()
    })

    it('should clear state value', () => {
      const e = Object.assign(jest.fn(), {preventDefault: () => {}})
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

      wrapper.setState(mockState)
      wrapper.instance().deleteItem(e)
      expect(wrapper.state()).toEqual(mockEmptyState)
    })

    it('should call delete with the correct id', () => {
      const e = Object.assign(jest.fn(), {preventDefault: () => {}})
      const mockState = {
        value: 'he',
        id: 6,
        completed: false,
      }

      wrapper.setState(mockState)
      wrapper.instance().deleteItem(e)
      expect(wrapper.instance().props.delete).toBeCalledWith(6)
    }) 
  })

  describe('toggleCompleted', () => {
    it('should be called when the checkbox is changed', () => {
      let input = wrapper.find('.complete-item')
      wrapper.instance().toggleCompleted = jest.fn()
      input.simulate('change')
      expect(wrapper.instance().props.moveCompleted).toBeCalled()
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