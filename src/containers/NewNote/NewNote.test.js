// import React from 'react';
// import {NewNote, mapDispatchToProps} from './NewNote';
// import {shallow} from 'enzyme';
// import {addNote} from '../../helpers/apiCalls';
// import { storeNote } from '../../actions';
// import mockNote from '../../helpers/mockData';

// jest.mock('../../helpers/apiCalls');

// describe('NewNote', () => {
//   let wrapper;

//   beforeEach(() => {
//     wrapper = shallow(
//       <NewNote />
//     )
//   })
//   //snapshot
//   it('should have a default state', () => {
//     expect(wrapper.state()).toEqual( {inputs: 0, title: '', listText: '', items: []} )
//   })

//   describe('handleChange', () => {
//     it('should update the title state upon typing', () => {
//       expect(wrapper.state()).toEqual( {inputs: 0, title: '', listText: '', items: []} )
//       const mockEvent = {target:{value: 'typing', name: 'title'}}

//       wrapper.instance().handleChange(mockEvent)

//       expect(wrapper.state()).toEqual( {inputs: 0, title: 'typing', listText: '', items: []} )
//     })

//     it('should update the item state upon typing', () => {
//       expect(wrapper.state()).toEqual( {inputs: 0, title: '', listText: '', items: []} )
//       const mockEvent = {target:{value: 'item one', name: 'listText'}}

//       wrapper.instance().handleChange(mockEvent)

//       expect(wrapper.state()).toEqual( {inputs: 0, title: '', listText: 'item one', items: []} )
//     })
//   })

//   describe('handleBlur', () => {
//     it('should update the items state on blur and reset the item state', () => {
//       wrapper.setState({inputs: 0, title: '', listText: 'first item', items: []})

//       wrapper.instance().handleBlur()

//       expect(wrapper.state()).toEqual( {inputs: 0, title: '', listText: '', items: ['first item']} )
//     })
//   })

//   describe('sendNote', () => {
//     it('should update the api with a new note when a form is submitted', () => {
//       const mockState = {inputs: 0, title: 'note title', listText: '', items: ['first', 'second']}
//       const expected = {
//         title: mockState.title,
//         items: mockState.items
//       }

//       wrapper.setState(mockState)
//       expect(wrapper.state()).toEqual( mockState )

//       const mockEvent = {
//         preventDefault: jest.fn()
//       }

//       wrapper.instance().sendNote(mockEvent)

//       expect(addNote).toHaveBeenCalledWith(expected)
//     })

//     it('should call storeNote with a new note', async () => {
//       const mockState = {inputs: 0, title: 'note title', listText: '', items: ['first', 'second']}
//       const expected = {
//         title: mockState.title,
//         items: mockState.items
//       }

//       wrapper.setState(mockState)
//       expect(wrapper.state()).toEqual( mockState )

//       const props = {
//         storeNote: jest.fn()
//       }
//             wrapper = shallow(
//               <NewNote {...props} />
//             )

//       const mockEvent = {
//         preventDefault: jest.fn()
//       }

//       await wrapper.instance().sendNote(mockEvent)
//       expect(addNote).toHaveBeenCalledWith(expected)
//       const addedNote = await addNote(expected)
//       expect(wrapper.instance().props.storeNote).toHaveBeenCalledWith(addedNote)
//     })
//   })

//   describe('handleItem', () => {

//     let mockState;

//     beforeEach(() => {
//       mockState = {
//         inputs: 0, 
//         title: 'note title', 
//         listText: '',
//         items: [
//           {
//            id: 2,
//            value: 'hello',
//            completed: false,
//          },
//            {
//             id: 1,
//             value: 'some text',
//             completed: true,
//          }
//          ]
//        }

//        wrapper.setState(mockState)
//     })

//     it('should call addItem if new item doesnt exist in state', () => {

//       expect(wrapper.state()).toEqual( mockState )

//       wrapper.instance().addItem = jest.fn()

//       const mockCurrItem = {
//         id: 4,
//         value: 'new text',
//         completed: false,
//      }

//      wrapper.instance().handleItem(mockCurrItem)
//      expect(wrapper.instance().addItem).toHaveBeenCalledWith(mockCurrItem)
//     })

//     it('should call updateItems if currItem exists in state with a modified existing item', () => {
//       expect(wrapper.state()).toEqual( mockState )

//       wrapper.instance().updateItems = jest.fn()

//       const mockCurrItem = {
//         id: 1,
//         value: 'some updated text',
//         completed: true,
//      }

//       const mockUpdatedItems = [
//           {
//            id: 2,
//            value: 'hello',
//            completed: false,
//          },
//            {
//             id: 1,
//             value: 'some updated text',
//             completed: true,
//          }
//         ]

//      wrapper.instance().handleItem(mockCurrItem)
//      expect(wrapper.instance().updateItems).toHaveBeenCalledWith(mockUpdatedItems)
//     })
//   })

//   describe('addItem', () => {
//     it('should update state with new item and inputs value', () => {
//       const mockState = {
//         inputs: 0, 
//         title: 'note title', 
//         listText: '',
//         items: [
//           {
//            id: 2,
//            value: 'hello',
//            completed: false,
//          },
//            {
//             id: 1,
//             value: 'some text',
//             completed: true,
//          }
//          ]
//        }

//        const mockCurrItem = {
//         id: 3,
//         value: 'a new item',
//         completed: false,
//      }

//        wrapper.setState(mockState)
//        expect(wrapper.state()).toEqual( mockState )

//        wrapper.instance().addItem(mockCurrItem)

//        expect(wrapper.state('inputs')).toEqual( 1 )
//        expect(wrapper.state('items')).toEqual([...mockState.items, mockCurrItem])
//     })
//   })

//   describe('updateItems', () => {
//     it('should update the existing items in state', () => {
//       const mockState = {
//         inputs: 0, 
//         title: 'note title', 
//         listText: '',
//         items: [
//           {
//            id: 2,
//            value: 'hello',
//            completed: false,
//          },
//            {
//             id: 1,
//             value: 'some text',
//             completed: true,
//          }
//          ]
//        }

//        const mockUpdatedItems = [
//         {
//          id: 2,
//          value: 'hello',
//          completed: false,
//        },
//          {
//           id: 1,
//           value: 'girrrl hennyyy',
//           completed: true,
//        }
//        ]

//       wrapper.setState(mockState)
//       expect(wrapper.state()).toEqual( mockState )

//       wrapper.instance().updateItems(mockUpdatedItems)

//       expect(wrapper.state('items')).toEqual(mockUpdatedItems)
//     })
//   })

//   describe('mapDispatchToProps', () => {
//     const mockDispatch = jest.fn()
//     const actionToDispatch = storeNote(mockNote)

//     const mappedProps = mapDispatchToProps(mockDispatch)
//     mappedProps.storeNote(mockNote)

//     expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
//   })
// })