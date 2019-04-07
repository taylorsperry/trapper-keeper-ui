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
  this.setState({
    items: [...this.state.items, currItem],
  })
}

updateItems = (updatedItems) => {
  let incompleteItems = updatedItems.filter(item => !item.completed)
  let completeItems = updatedItems.filter(item => item.completed)
  this.setState({
    items: [...incompleteItems, ...completeItems]
  })
}

render() {
  let { items } = this.state

  let existingItems = items.map(item => <NewItem 
              {...item} 
              handleItem={this.handleItem} 
              handleChange={this.handleChange}
            />)
  
  let filteredItems = [...existingItems, <NewItem handleItem={this.handleItem} handleChange={this.handleChange} />]
  
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
          <div>
            {filteredItems}
          </div>
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

