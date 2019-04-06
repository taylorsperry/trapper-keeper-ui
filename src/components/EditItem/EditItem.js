import React, { Component } from 'react'

export class EditItem extends Component {
  constructor(props) {
    super(props); 
      this.state = {
        value: '',
        id: this.props.id,
        completed: false,
      }
  }

  handleItemChange = (e) => {
    this.setState({
      value: e.target.value
    })
    this.props.handleChange(e)
  }

  handleItemBlur = (e) => {
    let { id, value, completed } = this.state
    let currItem = {id, value, completed}
    if(value) {
      this.props.handleItem(currItem)
    }
  }

  render() {
    console.log(this.props)
    const { value } = this.props
    return (
      <div className='list-container'>
        <button className='list-control'></button>
        <textarea defaultValue={value}
                  className='list-item'
                  onBlur={this.handleItemBlur}
                  onChange={this.handleItemChange}
                  name='listText'
                  placeholder='Add a new item...'
                  >
        </textarea>
        <button className='list-control delete-item'>X</button>
      </div>
    )
  }
}

export default EditItem