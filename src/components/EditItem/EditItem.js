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

  render() {
    const { value, id, completed } = this.props
    return (
      <div className='list-container' >
        <textarea onChange={this.updateItem}
                  onBlur={this.editItem}
                  >{value}
        </textarea>
        <h4>{completed}</h4>
        <h5>{id}</h5>
        <button className='list-control'></button>
        <button className='list-control delete-item'>X</button>
      </div>
    )
  }
}

export default EditItem;

// export const mapDispatchToProps = (dispatch) => ({
//   changeItem: (item) => dispatch(changeItem(item))
// })

// export default connect(null, mapDispatchToProps)(EditItem)