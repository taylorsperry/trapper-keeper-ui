import React from 'react'
import { NoteContainer } from './NoteContainer'
import { mockAllNotes } from '../../helpers/mockData'
import { shallow } from 'enzyme'

describe('NoteContainer', () => {
  let wrapper

  it('should match snapshot', () => {
    wrapper = shallow(
      <NoteContainer {...mockAllNotes} />
    )

      expect(wrapper).toMatchSnapshot()
  })
})
