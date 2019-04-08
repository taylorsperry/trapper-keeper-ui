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

  updateState = (newItem) => {
    console.log(this.state)
    if(this.state.items.length) {
      const updatedItems = this.state.items.map(item => {
        if (item.id == newItem.id) {
          item = newItem
        }
        return item
      })
      let index = updatedItems.indexOf(newItem)
      console.log(index)
      if(!updatedItems[index + 1]) {
        this.setState({
          items: [...updatedItems, {value: '', id: Date.now(), completed: false} ]
        })
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

  render() {
    console.log(this.props)
    const { title, items, id } = this.props
    console.log(this.state)
    return (
      <form onSubmit={this.editNote}>
        <h2>{title}</h2>
        {this.state.items && 
          this.state.items.map(item => <EditItem {...item} 
                                      updateItem={this.updateState}
                                    /> )
        }
        <button>Save</button>
      </form>
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