import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteNote } from '../../actions';
import { removeNote } from '../../helpers/apiCalls';
import EditItem from '../../components/EditItem/EditItem'


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
    const { title, items, id } = this.props
    let editableItems
    if (items) {
      editableItems = items.map(item => <EditItem {...item} />)
    }

    return(
      <div>
        <p>Edit Note!</p>
        <p>{title}</p>
        <div onClick={() => this.handleDelete(id)}>X</div>
        {editableItems}
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  deleteNote: (id) => dispatch(deleteNote(id))
})

export default connect(null, mapDispatchToProps)(EditNote)