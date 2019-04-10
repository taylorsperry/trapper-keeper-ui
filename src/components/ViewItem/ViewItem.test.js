import React from 'react'
import { ViewItem } from './ViewItem'
import { shallow } from 'enzyme'
import { mockNote } from '../../helpers/mockData'

describe('ViewItem', () => {
  let wrapper;
  it('should match snapshot', () => {
    wrapper = shallow(
      <ViewItem {...mockNote.items[0].value}/>
    )

    expect(wrapper).toMatchSnapshot()
  })
})