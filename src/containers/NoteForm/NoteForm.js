import React, { Component } from 'react'

export class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      items: [],
    }
  }

  render() {
  //for each input, on focus, create a new input
  return (
    <form>
      <input className='title'></input>
      <input className='item'></input>
      <button>Save</button>
    </form>
  )
}
}

export default NoteForm;