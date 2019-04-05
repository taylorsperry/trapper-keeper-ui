import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteNote } from '../../actions';
import { removeNote } from '../../helpers/apiCalls';


export class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleDelete = (id) => {
    // e.preventDefault();
    console.log(id)
    this.props.deleteNote(id)
    removeNote(id)
  }

  render() {
    const { title, items, id } = this.props
    // key={Date.now()} - may need shortid?
    const itemList = items.map(item => <li>{item}</li>)
    return(
      <form>
        <p>{title}</p>
        <ul>
          {itemList}
        </ul>
        <div onClick={() => this.handleDelete(id)}>X</div>
      </form>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  deleteNote: (id) => dispatch(deleteNote(id))
})

export default connect(null, mapDispatchToProps)(Note)