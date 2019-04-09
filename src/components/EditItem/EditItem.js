import React, { Component } from 'react'
import { connect } from 'react-redux'
import {changeItem} from '../../actions'

export class EditItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      id: '',
      completed: false,
    }
  }

  componentDidMount = () => {
    this.setState({
      value: this.props.value,
      id: this.props.id,
      completed: this.props.completed,
    })
  }

  updateItem = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  editItem = (e) => {
    e.preventDefault()
    if(this.state.value) {
      this.props.updateNoteItems(this.state)
    }
  }

  deleteItem = (e) => {
    e.preventDefault()
    this.setState({value: ''})
    this.props.delete(this.state.id)
  }

  toggleCompleted = () => {
    let complete = !this.state.completed
    const {value, id} = this.state
    this.setState({completed: !this.state.completed})
  }

  render() {
    return (
      <div className='list-container' >
        <input type='checkbox'
                className='list-control complete-item'
                name='completed'
                checked={this.state.completed}
                onChange={this.toggleCompleted}
                >
        </input>
        {
          this.state.id &&
          <textarea onChange={this.updateItem}
                    className="list-item"
                    defaultValue={this.state.value}
                    >
          </textarea>
        }
        <button className='confirm-item' onClick={this.editItem}>Edit</button>
        <button className='list-control delete-item' onClick={this.deleteItem}>X</button>
      </div>
    )
  }
}

export default EditItem