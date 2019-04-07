import React, { Component } from 'react'

export class EditItem extends Component {
  constructor(props) {
    super(props); 
      this.state = {
        value: '',
        // id: this.props.id,
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
    let { value, completed } = this.state
    let currItem = {id: this.props.id, value, completed}
    if(value) {
      this.props.handleItem(currItem)
      this.setState({ value: '' })
    }
  }


  render() {
    console.log(this.props)
    const { value, id } = this.props
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
        <div className='list-control delete-item' onClick={() => this.props.handleItemDelete(id)}>X</div>
      </div>
    )
  }
}

export default EditItem