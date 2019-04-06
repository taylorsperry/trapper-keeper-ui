import NewItem from './NewItem'
import React from 'react'
import { shallow } from 'enzyme'

describe('NewItem', () => {
  let wrapper;

  beforeEach(() => {
    const props = {
      handleChange: jest.fn(),
      handleItem: jest.fn()
    }

    Date.now = jest.fn().mockImplementation(() => 6)
    wrapper = shallow(
      <NewItem {...props}/>
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have a default state', () => {
    expect(wrapper.state()).toEqual( {value: '', id: Date.now(), completed: false} )
  })

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

    wrapper.instance().handleItemChange(mockEvent)
    expect(wrapper.state('value')).toEqual('hey')
    expect(wrapper.instance().props.handleChange).toHaveBeenCalledWith(mockEvent)
  })

describe('handleItemBlur', () => {
  it('should call handleItem with the properties in state', () => {
    const mockState = {
      value: 'he',
      id: 6,
      completed: false,
    }
    wrapper.setState(mockState)
    expect(wrapper.instance().state).toEqual(mockState)

    wrapper.instance().handleItemBlur()
    expect(wrapper.instance().props.handleItem).toHaveBeenCalledWith(mockState)
  })

  it('should not call handleItem if the value in state is and empty string', () => {
    const mockState = {
      value: '',
      id: 6,
      completed: false,
    }
    wrapper.setState(mockState)
    expect(wrapper.instance().state).toEqual(mockState)

    wrapper.instance().handleItemBlur()
    expect(wrapper.instance().props.handleItem).not.toHaveBeenCalled()
  })
})
})