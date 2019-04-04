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

handleBlur = () => {
  let currItem = { id: Date.now(), value: this.state.item }
  this.setState( {items: [...this.state.items, currItem], item: ''} )
}

sendNote = async (e) => {
  e.preventDefault()
  const { title, items} = this.state
  const newNote = await addNote({title, items})
  this.props.storeNote(newNote)
}

updateItem = (id, value) => {
  if(value) {
    let items = this.state.items;
    let index = items.findIndex(item => item.id === id)
    items.splice(index, 1, {id, value})
    this.setState({
      items: items
    })
  }
}

render() {
  if (this.state.item || this.state.items.length === 0) {
    let input = <input 
      className='item' 
      onChange={this.handleChange}
      onBlur={this.handleBlur}
      value={this.state.item}
      name="item"
    >
    </input>
    this.setState({
      items: [...this.state.items, input]
    })
  }

  let items = this.state.items.map(item => 
    <Item key={item.id} id={item.id} value={item.value} updateItem={this.updateItem}/>
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