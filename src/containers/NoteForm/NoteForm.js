import React, { Component } from 'react'
import { addNote } from '../../helpers/apiCalls'
import { connect } from 'react-redux'
import { storeNote } from '../../actions'
import Item from '../../components/Item/Item'

export class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      item: '',
      items: [],
    }
  }

handleChange = (e) => {
  this.setState({[e.target.name]: e.target.value})
}

// handleBlur = (currItem) => {
//   // let currItem = { id: Date.now(), value: this.state.item }
//   this.setState( {items: [...this.state.items, currItem], item: ''} )
// }

// sendNote = async (e) => {
//   e.preventDefault()
//   const { title, items} = this.state
//   const newNote = await addNote({title, items})
//   this.props.storeNote(newNote)
// }

handleItem = (currItem) => {
  let found = false;
  let updatedItems = this.state.items.map(item => {
    if(item.id === currItem.id) {
      found = true;
      item = currItem;
    } 
    return item
  })
  if (!found) {
    
    this.setState({
      items: [...this.state.items, currItem]
    })
  } else {
    this.setState({
      items: updatedItems
    })
  }
}

render() {
  // if (this.state.items.length === 0) {
  //   let input = <Item value={''} />
  //   this.setState({
  //     items: [...this.state.items, input]
  //   })
  // }

let input = <Item />
  let addInput = [...this.state.items, input]

  let items = addInput.map(item => 
    <Item key={item.id} id={item.id} value={item.value} handleItem={this.handleItem} handleChange={this.handleChange} />
    )

  return (
    <form onSubmit={this.sendNote}>
      <input className='title' 
             onChange={this.handleChange}
             value={this.state.title}
             name="title"
             >
      </input>
      {items}
      {/* <input className='item' 
             onChange={this.handleChange}
             onBlur={this.handleBlur}
             value={this.state.item}
             name="item"
             >
      </input> */}
      <button>Save</button>
    </form>
  )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  storeNote: (note) => dispatch(storeNote(note))
})

export default connect(null, mapDispatchToProps)(NoteForm);