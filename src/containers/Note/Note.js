import React, { Component } from 'react'
import Item from '../../components/Item/Item'

export class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    let { title, items } = this.props.note
    console.log(items)
    let existingItems = items.map(item => <Item />)
    return(
      <form>
        <p>{title}</p>
        {existingItems}
      </form>
    )
  }
}

export default Note