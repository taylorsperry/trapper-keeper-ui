import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteNote } from '../../actions';
import { removeNote } from '../../helpers/apiCalls';


export class EditNote extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  //handleItemChange, if the item exists, update state
  //handleItemChange, it the item !exist, add to state
  //when you hit save, update the backend, update the store

  //will have child component EditItem: 
  //onChange to update the value in state
  //onBlur send the value in state up to Note
  
  handleDelete = (id) => {
    // e.preventDefault();
    console.log(id)
    this.props.deleteNote(id)
    removeNote(id)
  }

  render() {
    console.log(this.props)
    return(
      <div>
        <p>Edit Note!</p>
        <p>{this.props.title}</p>
        <div onClick={() => this.handleDelete(this.props.id)}>X</div>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  deleteNote: (id) => dispatch(deleteNote(id))
})

export default connect(null, mapDispatchToProps)(EditNote)