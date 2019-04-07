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
      title: '',
      listText: '',
      id: '',
      items: [],
      inputs: 0,
    }
  }

  componentDidMount = () => {
    console.log('mount runs')
    if (!this.state.id) {
      this.gatherInfo(this.props)
    }
  }

  gatherInfo = (props) => {
    this.setState({ items: props.items,
                    title: props.title,
                    id: props.id
    })
  }
  
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
    let found = false
    let updatedItems = this.state.items.map(item => {
      if(item.id === currItem.id) {
        found = true
        item = currItem
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
      inputs: count,
    })
  }
  
  updateItems = (updatedItems) => {
    this.setState({
      items: updatedItems,
    })
  }

  handleItemDelete = (id) => {
    const findItem = this.state.items.filter(item => item.id != id)
    this.updateItems(findItem)

  }

  sendUpdate = async (e) => {
    e.preventDefault()
    let { history } = this.props
    const { title, items, id } = this.state
    const note = {title, items, id: this.props.id}
    console.log(note)
    const response = await updateNote(note)
    this.props.storeUpdate(note)
    history.push('/')
  }

  render() {
    const { title, items, id } = this.props
    let editableItems
    if (this.state.items) {
      editableItems = this.state.items.map(item => <EditItem {...item} handleChange={this.handleChange} handleItem={this.handleItem} handleItemDelete={this.handleItemDelete}/>)
    }

    let inputs = []
    for (let i = 0; i <= this.state.inputs; i++) {
      inputs.push(<EditItem handleItem={this.handleItem} 
                            handleChange={this.handleChange} 
                            handleItemDelete={this.handleItemDelete}
                            />)
    }
    // console.log(this.props)
    // console.log(this.state)
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

// export const mapStateToProps = (state) => ({
//   notes: state.notes
// })

export const mapDispatchToProps = (dispatch) => ({
  deleteNote: (id) => dispatch(deleteNote(id)),
  storeUpdate: (updatedNote) => dispatch(storeUpdate(updatedNote)) 
})

export default withRouter(connect(null, mapDispatchToProps)(EditNote))