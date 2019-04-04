import React, { Component } from 'react';

export class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      id: Date.now(),
    }
  }

  handleItemChange = (e) => {
    this.setState({
      value: e.target.value
    })
    this.props.handleChange(e)
  }

  handleItemBlur = (e) => {
    let { id, value } = this.state;
    let currItem = {id, value}
    this.props.handleItem(currItem)
  }

  render() {
  return (
    <textarea value={this.state.value}
              onChange={this.handleItemChange} 
              onBlur={this.handleItemBlur}
              name='listText'
            >
    </textarea>
  )
}
}

export default Item;

