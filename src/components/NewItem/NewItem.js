import React, { Component } from 'react';

export class NewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      id: Date.now(),
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
    let { id, value, completed } = this.state;
    let currItem = {id, value, completed}
    if(value) {
      this.props.handleItem(currItem)
    }
  }

  render() {
    return (
      <div className='list-container'>
        <button className='list-control'></button>
        <textarea value={this.state.value}
                  onChange={this.handleItemChange} 
                  onBlur={this.handleItemBlur}
                  name='listText'
                  placeholder='Add an item . . .'
                  className='list-item'
                >
        </textarea>
        <button className='list-control delete-item'>X</button>
      </div>
    )
  }
}

export default NewItem;