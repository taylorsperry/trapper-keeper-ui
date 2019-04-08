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
    this.setState({value: ''})
  }

  deleteItem = (e) => {
    e.preventDefault()
    this.setState({value: ''})
    this.props.delete(this.state.id)
  }

  toggleCompleted = (e) => {
    e.preventDefault()
    let complete = !this.state.completed
    const {value, id} = this.state
    this.props.updateItem({value, id, complete})
    this.setState({completed: !this.state.completed})
  }

  render() {
    const { value, id, completed } = this.props
    console.log(this.state)
    return (
      <div className='list-container' >
        <textarea onChange={this.updateItem}
                  onBlur={this.editItem}
                  >{value}
        </textarea>
        <h4>{completed}</h4>
        <h5>{id}</h5>
        <button className='list-control' onClick={this.toggleCompleted}></button>
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