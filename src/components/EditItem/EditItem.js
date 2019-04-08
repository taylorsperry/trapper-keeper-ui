import React, { Component } from 'react'
import { connect } from 'react-redux'
import {changeItem} from '../../actions'

export class EditItem extends Component {
  constructor({props}) {
    super({props});
    this.state = {
      value: '',
      id: '',
      completed: '',
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

  editItem = () => {
    if(this.state.value) {
      this.props.updateItem(this.state)
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
    this.props.updateItem({value, id, complete}, 'completed')
    this.setState({completed: !this.state.completed})
  }

  render() {
    const { value, id, completed } = this.props
    console.log(this.state)
    return (
      <div className='list-container' >
        <input type='checkbox'
                className='list-control'
                name='completed'
                checked={this.state.completed}
                onChange={this.toggleCompleted}
                >
        </input>
        <textarea onChange={this.updateItem}
                  className="list-item"
                  onBlur={this.editItem}
                  defaultValue={value}
                  >
        </textarea>
        <button className='list-control delete-item' onClick={this.deleteItem}>X</button>
      </div>
    )
  }
}

export default EditItem;

// export const mapDispatchToProps = (dispatch) => ({
//   changeItem: (item) => dispatch(changeItem(item))
// })

// export default connect(null, mapDispatchToProps)(EditItem)