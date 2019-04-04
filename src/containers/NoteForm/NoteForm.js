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
      listText: '',
      items: [],
      inputs: 0,
    }
  }

handleChange = (e) => {
  this.setState({[e.target.name]: e.target.value})
}

handleBlur = () => {
  this.setState( {items: [...this.state.items, this.state.listText], listText: ''} )
}

sendNote = async (e) => {
  e.preventDefault()
  const { title, items} = this.state
  const newNote = await addNote({title, items})
  this.props.storeNote(newNote)
}

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
    let count = this.state.inputs
    count++
    this.setState({
      items: [...this.state.items, currItem],
      inputs: count
    })
  } else {
    this.setState({
      items: updatedItems
    })
  }
}

render() {
  let inputs = []

   for (let i = 0; i <= this.state.inputs; i++) {
    inputs.push(<Item handleItem={this.handleItem} handleChange={this.handleChange} />)
  }

  return (
    <form onSubmit={this.sendNote}>
      <input className='title' 
             onChange={this.handleChange}
             value={this.state.title}
             name="title"
             >
      </input>
      {/* <input className='listText' 
             onChange={this.handleChange}
             onBlur={this.handleBlur}
             value={this.state.listText}
             name="listText"
             >
      </input> */}
      {inputs}
      <button>Save</button>
    </form>
  )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  storeNote: (note) => dispatch(storeNote(note))
})

export default connect(null, mapDispatchToProps)(NoteForm);