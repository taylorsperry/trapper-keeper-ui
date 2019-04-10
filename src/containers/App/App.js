import React, { Component } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import NoteContainer from '../../components/NoteContainer/NoteContainer'
import { storeSavedNotes } from '../../actions'
import { getNotes } from '../../helpers/apiCalls'
import EditNote from '../EditNote/EditNote'
import './_App.scss'

export class App extends Component {
  
  componentDidMount = async () => {
    try {
      const allNotes = await getNotes()
      this.props.storeSavedNotes(allNotes)
    } catch (error) {
      return error.message
    }
  }

  findNote = ({ match }) => {
    const foundNote = this.props.notes.find(note => note.id === match.params.id)
    if(!foundNote) {
      return '404 no note found!'
    }
    return <EditNote {...foundNote} />
  }
  
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <div className='logo'>
            <i className='fas fa-file'></i>
            <Link to='/'>
              <h1>Trapper Keeper</h1>
            </Link>
          </div>
          <Link to='/new-note'>
            <button className='new-note'>New Note</button>
          </Link>
        </header>
        {!this.props.notes.length && <p className='no-notes'>Create a note<i class='fas fa-arrow-up'></i></p>}
        <Route exact path='/' component= { () => <NoteContainer notes={this.props.notes} /> } />
        <Route path='/new-note' component={ () => <EditNote />} />
        <Route path='/notes/:id' render={this.findNote} />
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  notes: state.notes
})

export const mapDispatchToProps = (dispatch) => ({
  storeSavedNotes: (notes) => dispatch(storeSavedNotes(notes))
})

App.propTypes = {
  notes: PropTypes.array,
  storeSavedNotes: PropTypes.func
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))