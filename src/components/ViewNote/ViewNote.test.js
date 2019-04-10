import React from 'react'
import { ViewNote } from './ViewNote'
import { shallow } from 'enzyme'
import { mockProp } from '../../helpers/mockData'

describe('ViewNote', () => {
  let wrapper

  it('should match the snapshot', () => {
    wrapper = shallow(<ViewNote {...mockProp} />)
    expect(wrapper).toMatchSnapshot()
  })
})