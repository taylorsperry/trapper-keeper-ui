import React, { Component } from 'react';

export class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    }
  }

  handleItemChange = (e) => {
    this.setState({
      value: e.target.value
    })
    // this.props.handleChange(e)
  }

  handleItemBlur = (e) => {
    let { id } = this.props;
    if(this.state.value) {
    let currItem = {id, value: this.state.value}
    this.setState({
      value: ''
    }, () => this.props.handleItem(currItem))
  }
  }

  render() {
  // let { value } = this.props;

  return (
    <textarea defaultValue={this.state.value} 
              onChange={this.handleItemChange} 
              onBlur={this.handleItemBlur}
              name='item'
            >
    </textarea>
  )
}
}

export default Item;

