import React, { Component } from 'react'
import './_NewNote.scss'
import { addNote } from '../../helpers/apiCalls'
import { connect } from 'react-redux'
import { storeNote } from '../../actions'
import { withRouter } from 'react-router-dom'
import NewItem from '../../components/NewItem/NewItem'

export class NewNote extends Component {
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
  this.setState( {[e.target.name]: e.target.value} )
}

sendNote = async (e) => {
  e.preventDefault()
  let { history } = this.props;
  const { title, items} = this.state
  const note = {title, items}
  const newNote = await addNote(note)
  this.props.storeNote(newNote)
  history.push('/')
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
    this.addItem(currItem)
  } else {
    this.updateItems(updatedItems)
  }
}

addItem = (currItem) => {
  let count = this.state.inputs
  count++
  this.setState({
    items: [...this.state.items, currItem],
    inputs: count
  })
}

updateItems = (updatedItems) => {
  this.setState({
    items: updatedItems
  })
}

render() {
  let inputs = []

  for (let i = 0; i <= this.state.inputs; i++) {
    inputs.push(<NewItem handleItem={this.handleItem} handleChange={this.handleChange} />)
  }

  return (
    <div className='form-container'>
      <form onSubmit={this.sendNote}>
        <input className='title' 
              onChange={this.handleChange}
              value={this.state.title}
              name="title"
              placeholder='Title'
              >
        </input>
        {inputs}
        <div className='note-controls'>
          
            <button className='save-note'>Save Note</button>
          
        </div>
      </form>
    </div>
  )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  storeNote: (note) => dispatch(storeNote(note))
})

export default withRouter(connect(null, mapDispatchToProps)(NewNote));

