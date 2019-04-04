import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'
import NoteContainer from '../../components/NoteContainer/NoteContainer';
import NoteForm from '../NoteForm/NoteForm';
import { storeSavedNotes } from '../../actions';
import { getNotes } from '../../helpers/apiCalls';
import './App.scss';

export class App extends Component {
  
  componentDidMount = async () => {
    if (!this.props.notes.length) {
      const allNotes = await getNotes();
      this.props.storeSavedNotes(allNotes)
    }
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Trapper Keeper
        </header>
        <Route path='/' component= { () => <NoteContainer notes={this.props.notes} /> } />
        <Route path='/new-note' component={ NoteForm } />
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  notes: state.notes
})

export const mapDispatchToProps = (dispatch) => ({
  storeSavedNotes: (notes) => dispatch(storeSavedNotes(notes))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
