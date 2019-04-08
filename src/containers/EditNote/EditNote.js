import React, { Component } from 'react';
import EditItem from '../../components/EditItem/EditItem';
import NewItem from '../../components/NewItem/NewItem';
import { updateNote } from '../../helpers/apiCalls';
import { connect } from 'react-redux';
import { storeUpdate } from '../../actions';

export class EditNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      items: this.props.items,
      title: this.props.title,
    }
  }

  componentDidMount = () => {
    this.setState({
      id: this.props.id,
      items: this.props.items,
      title: this.props.title,
    })
  }

  updateState = (newItem, completed) => {
    console.log(this.state)
    console.log(completed)
    if(this.state.items.length) {
      const updatedItems = this.state.items.map(item => {
        if (item.id == newItem.id) {
          item = newItem
        }
        return item
      })
      let index = updatedItems.indexOf(newItem)
      if(!updatedItems[index + 1] && !completed) {
        this.setState({
          items: [...updatedItems, {value: '', id: Date.now(), completed: false} ]
        })
        console.log(this.state.items)
      } else {
        this.setState({
          items: updatedItems
        })
      }
    }
  }

  editNote = async (e) => {
    e.preventDefault()
    let newItems = this.state.items.filter(item => item.value)
    this.setState({
      items: newItems
    })
    const { id, title } = this.state
    const editedNote = await updateNote({id, title, items: newItems})
    this.props.storeUpdate(this.state)
  }

  deleteItem = async (itemId) => {
    let newItems = this.state.items.filter(item => item.id !== itemId)
    this.setState({items: newItems})
    const { id, title } = this.state
    const editedNote = await updateNote({id, title, items: newItems})
    this.props.storeUpdate(this.state)
  }

  render() {
    console.log(this.props)
    const { title, items, id } = this.props
    console.log(this.state)
    return (
      <div className="form-container">
        <form onSubmit={this.editNote}>
        <input className='title' 
              // onChange={this.handleChange}
              value={title}
              name="title"
              placeholder='Title'
              >
        </input>
          {this.state.items && 
            this.state.items.map(item => <EditItem {...item} 
                                        updateItem={this.updateState}
                                        delete={this.deleteItem}
                                        key={item.value}
                                      /> )
          }
          <div className="note-controls">
            <button>Save</button>
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
  storeUpdate: (note) => dispatch(storeUpdate(note))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);