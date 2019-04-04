import React, { Component } from 'react';

export class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    }
  }

  handleItemChange = (e) => {
    let { id } = this.props;
    this.setState({
      value: e.target.value
    }, () => this.props.updateItem(id, this.state.value))
  }

  render() {
  let { value } = this.props;

  return (
    <textarea defaultValue={value} onChange={this.handleItemChange}>
    </textarea>
  )
}
}

export default Item;

