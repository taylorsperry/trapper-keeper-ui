import React, { Component } from 'react'

export class EditItem extends Component {
  constructor(props) {
    super(props) 
      this.state = {
       
      }
  }

  render() {
    const { value } = this.props;
    return (
      <div>{value}</div>
    )
  }
}

export default EditItem