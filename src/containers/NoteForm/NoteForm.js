import React, { Component } from 'react'
import { addNote } from '../../helpers/apiCalls'
import { connect } from 'react-redux'
import { storeNote } from '../../actions'

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

handleBlur = () => {
  let currItem = this.state.item
  this.setState( {items: [...this.state.items, currItem], item: ''} )
}

sendNote = async (e) => {
  e.preventDefault()
  const { title, items} = this.state
  const newNote = await addNote({title, items})
  this.props.storeNote(newNote)
}

render() {
  //for each input, on focus, create a new input
  return (
    <form onSubmit={this.sendNote}>
      <input className='title' 
             onChange={this.handleChange}
             value={this.state.title}
             name="title"
             >
      </input>
      <input className='item' 
             onChange={this.handleChange}
             onBlur={this.handleBlur}
             value={this.state.item}
             name="item"
             >
      </input>
      <button>Save</button>
    </form>
  )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  storeNote: (note) => dispatch(storeNote(note))
})

export default connect(null, mapDispatchToProps)(NoteForm);