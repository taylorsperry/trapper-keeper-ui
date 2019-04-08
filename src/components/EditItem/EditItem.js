import React, { Component } from 'react'

export class EditItem extends Component {
  constructor(props) {
    super(props); 
      this.state = {
        value: '',
        completed: false,
      }
  }

  // componentDidMount = () => {
  //   this.setState({ value: this.props.value })
  // }

  handleItemChange = (e) => {
    this.setState({
      value: e.target.value
    })
    this.props.handleChange(e)
  }

  handleItemBlur = (e) => {
    let { value, completed } = this.state
    let currItem
    if (!this.props.id) {
      currItem = {id: Date.now(), value, completed}
    } else {
      currItem = {id: this.props.id, value, completed}
    }
    if(value) {
      this.props.handleItem(currItem)
    }
    // this.setState({ value: ''})
  }


  render() {
    console.log(this.props.value)
    const { value, id } = this.props

    let card = (
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
  
    return (
      <div>
      {value && card}
      </div>
      // <div className='list-container'>
      //   <button className='list-control'></button>
      //   <textarea defaultValue={value}
      //             className='list-item'
      //             onBlur={this.handleItemBlur}
      //             onChange={this.handleItemChange}
      //             name='listText'
      //             placeholder='Add a new item...'
      //             >
      //   </textarea>
      //   <div className='list-control delete-item' onClick={() => this.props.handleItemDelete(id)}>X</div>
      // </div>
    )
  }
}

export default EditItem