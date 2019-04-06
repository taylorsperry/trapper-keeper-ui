import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { deleteNote, storeUpdate } from '../../actions'
import { removeNote, updateNote } from '../../helpers/apiCalls'
import EditItem from '../../components/EditItem/EditItem'


export class EditNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      listText: '',
      id: this.props.id,
      items: this.props.items,
      inputs: 0,
    }
  }
  //handleItemChange, if the item exists, update state
  //handleItemChange, it the item !exist, add to state
  //when you hit save, update the backend, update the store

  //will have child component EditItem: 
  //onChange to update the value in state
  //onBlur send the value in state up to Note
  
  handleChange = (e) => {
    this.setState( {[e.target.name]: e.target.value} )
  }

  handleDelete = (id) => {
    const { history } = this.props
    this.props.deleteNote(id)
    removeNote(id)
    history.push('/')
  }

  handleItem = (currItem) => {
    let found = false;
    let updatedItems = this.state.items.map(item => {
      if(item.id === currItem.id) {
        found = true;
        item = currItem;
      } 
      return item
    })
    if (!found) {
      this.addItem(currItem)
    } else {
      this.updateItems(updatedItems)
    }
  }

  addItem = (currItem) => {
    let count = this.state.inputs
    count++
    this.setState({
      items: [...this.state.items, currItem],
      inputs: count
    })
  }
  
  updateItems = (updatedItems) => {
    this.setState({
      items: updatedItems
    })
  }

  sendUpdate = async (e) => {
    e.preventDefault()
    let { history } = this.props;
    const { title, items, id } = this.state
    const note = {title, items, id}
    console.log(note)
    const response = await updateNote(note)
    this.props.storeUpdate(note)
    history.push('/')
  }

  render() {
    const { title, items, id } = this.props
    let editableItems
    if (items) {
      editableItems = items.map(item => <EditItem {...item} handleChange={this.handleChange} />)
    }

    let inputs = []

    for (let i = 0; i <= this.state.inputs; i++) {
      inputs.push(<EditItem handleItem={this.handleItem} 
                            handleChange={this.handleChange} 
                            />)
    }

    return(
      <div className='form-container'>
        <form onSubmit={this.sendUpdate}>
          <textarea className='title' 
                    onChange={this.handleChange}
                    value={this.state.title}
                    name='title'
                    >
          </textarea>
          {editableItems}
          {inputs}
          <div className='note-controls'>
            
            <button className='save-note'>Save Note</button>
            
            <button className='delete-note' onClick={() => this.handleDelete(id)}>X</button>
          </div>
        </form>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  notes: state.notes
})

export const mapDispatchToProps = (dispatch) => ({
  deleteNote: (id) => dispatch(deleteNote(id)),
  storeUpdate: (updatedNote) => dispatch(storeUpdate(updatedNote)) 
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditNote))