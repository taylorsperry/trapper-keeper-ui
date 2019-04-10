import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import EditItem from '../../components/EditItem/EditItem'
import { addNote, updateNote, removeNote } from '../../helpers/apiCalls'
import { connect } from 'react-redux'
import { storeUpdate, deleteNote, storeNote } from '../../actions'

export class EditNote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      items: [],
      title: '',
      new: false,
    }
  }

  componentDidMount = () => {
    if (this.props.id) {
      this.setState({
        id: this.props.id,
        items: this.props.items,
        title: this.props.title,
      })
    } else {
      this.setState({
        items: [{
          id: Date.now(),
          value: '',
          completed: false,
        }],
        new: true,
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  updateState = (newItem) => {
    if(this.state.items.length) {
      const updatedItems = this.state.items.map(item => {
        if (item.id === newItem.id) {
          item = newItem
        }
        return item
      })
      this.setState({
        items: updatedItems
      })
    }
  }

  moveCompleted = (completedItem) => {
    let newState = this.state.items.map(item => {
      if(item.id === completedItem.id) {
        item = completedItem
      }
      return item
    })
    this.setState({
      items: newState,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if(this.state.new === false) {
      this.editNote()
    } else {
      this.sendNote()
    }
  }

  sendNote = async () => {
    let { history } = this.props
    const { title } = this.state
    let items = this.state.items.filter(item => item.value)
    const note = {title, items}
    if (title && items.length) {
      try {
        const newNote = await addNote(note)
        this.props.storeNote(newNote)
        history.push('/')
      } catch(error) {
        return error.message
      }
    } else {
      alert('Please enter a title and a list.')
    }
  }

  editNote = async () => {
    const { history } = this.props
    let editedItems = this.state.items.filter(item => item.value)
    this.setState({
      items: editedItems
    })
    const { id, title, items } = this.state
    if (title && items.length) {
      try {
        await updateNote({id, title, items: editedItems})
        this.props.storeUpdate(this.state)
        history.push('/')
      } catch(error) {
        return error.message
      }
    } else {
      alert('Please enter a title and a list.')
    }
  }

  deleteItem = async (itemId) => {
    let newItems = this.state.items.filter(item => item.id !== itemId)
    this.setState({items: newItems})
    const { id, title, items } = this.state
    try {
      await updateNote({id, title, items: newItems})
      this.props.storeUpdate(id, title, items)
    } catch(error) {
      return error.message
    }
  }

  handleDeleteNote = (id) => {
    const { history } = this.props
    this.props.deleteNote(id)
    removeNote(id)
    history.push('/')
  }

  addItem = (e) => {
    e.preventDefault()
    this.state.items.push({value: '', id: Date.now(), completed: false})
    this.setState({
      items: this.state.items
    })
  }

  returnItemElement = (item) => (
    <EditItem {...item} 
              updateItem={this.updateState}
              delete={this.deleteItem}
              key={item.id}
              moveCompleted={this.moveCompleted}
              />
    )

  checkKey = (e) => {
    if(e.keyCode === 13) {
      e.preventDefault()
    }
  }                                        
                                 
  render() {
    let completeItems
    let incompleteItems
    let completeElements
    let incompleteElements
    if (this.state.items.length) {
      completeItems = this.state.items.filter(item => item.completed === true)
      incompleteItems = this.state.items.filter(item => item.completed === false)
      completeElements = completeItems.map(item => this.returnItemElement(item))
      incompleteElements = incompleteItems.map(item => this.returnItemElement(item))
    }

    return (
      <div className='form-container'>
        <form className='form' onSubmit={this.handleSubmit}>
          <input className='title' 
                onKeyUp={this.handleChange}
                onKeyDown={this.checkKey}
                defaultValue={this.state.title}
                name='title'
                placeholder='Title . . .'
                >
          </input>
          {this.state.items && 
            <div>
              {incompleteElements}
              {completeElements}
            </div>
          }
          <div className='note-controls'>
            <button className='save-note'
                    onClick={this.addItem}>Add An Item</button>
            <button className='save-note save'>Save Note</button>
            <button className='delete-note' onClick={() => this.handleDeleteNote(this.state.id)}>Delete Note</button>
          </div>
        </form>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  deleteNote: (id) => dispatch(deleteNote(id)),
  storeUpdate: (note) => dispatch(storeUpdate(note)),
  storeNote: (note) => dispatch(storeNote(note))
})

EditNote.propTypes = {
  deleteNote: PropTypes.func,
  storeUpdate: PropTypes.func,
  storeNote: PropTypes.func,
  foundNote: PropTypes.object
}


export default withRouter(connect(null, mapDispatchToProps)(EditNote))