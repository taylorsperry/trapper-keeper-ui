import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import EditItem from '../../components/EditItem/EditItem'
import NewItem from '../../components/NewItem/NewItem'
import { addNote, updateNote, removeNote } from '../../helpers/apiCalls'
import { connect } from 'react-redux'
import { storeUpdate, deleteNote, storeNote } from '../../actions'

export class EditNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      items: [],
      title: '',
      new: false,
    }
  }

  componentDidMount = () => {
    if(this.props.id) {
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

  updateState = (newItem, completed) => {
    console.log(this.state)
    console.log(completed)
    if(this.state.items.length) {
      const updatedItems = this.state.items.map(item => {
        if (item.id == newItem.id) {
          item = newItem
        }
        return item
      })
      let index = updatedItems.indexOf(newItem)
      if(!updatedItems[index + 1] && !completed) {
        this.setState({
          items: [...updatedItems, {value: '', id: Date.now(), completed: false} ]
        })
        console.log(this.state.items)
      } else {
        this.setState({
          items: updatedItems
        })
      }
    }
  }

  moveCompleted = (completedItem) => {
    console.log(this.state)
    if(completedItem.completed) {
      let newState = this.state.items.filter(item => item.id !== completedItem.id)
      newState.push(completedItem)
      this.setState({
        items: newState,
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    //either call editNote or sendNote
    if(this.state.new === false) {
      this.editNote()
    } else {
      this.sendNote()
    }
  }

  sendNote = async () => {
    console.log('fire')
    let { history } = this.props;
    const { title } = this.state
    let items = this.state.items.filter(item => item.value)
    const note = {title, items}
    const newNote = await addNote(note)
    this.props.storeNote(newNote)
    history.push('/')
  }

  editNote = async () => {
    
    const { history } = this.props
    let newItems = this.state.items.filter(item => item.value)
    this.setState({
      items: newItems
    })
    const { id, title } = this.state
    const editedNote = await updateNote({id, title, items: newItems})
    this.props.storeUpdate(this.state)
    history.push('/')
  }

  deleteItem = async (itemId) => {
    let newItems = this.state.items.filter(item => item.id !== itemId)
    this.setState({items: newItems})
    const { id, title, items } = this.state
    const editedNote = await updateNote({id, title, items: newItems})
    this.props.storeUpdate(id, title, items)
  }

  handleDeleteNote = (id) => {
    const { history } = this.props
    this.props.deleteNote(id)
    removeNote(id)
    history.push('/')
  }

  render() {
    console.log(this.state)
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
        <input className='title' 
              onChange={this.handleChange}
              defaultValue={this.state.title}
              name="title"
              placeholder='Title'
              >
        </input>
          {this.state.items && 
            this.state.items.map(item => <EditItem {...item} 
                                        updateItem={this.updateState}
                                        delete={this.deleteItem}
                                        moveCompleted={this.moveCompleted}
                                        key={item.id}
                                      /> )
          }
          <div className="note-controls">
          <button className='save-note'>Update</button>
          <button className='delete-note' onClick={() => this.handleDeleteNote(this.state.id)}>X</button>
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

export default withRouter(connect(null, mapDispatchToProps)(EditNote));