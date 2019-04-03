import React, { Component } from 'react'
import {addNote} from '../../helpers/apiCalls'

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

sendNote = (e) => {
  e.preventDefault()
  const { title, items} = this.state
  const newNote = addNote({title, items})
  //call action dispatch to store
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

export default NoteForm;