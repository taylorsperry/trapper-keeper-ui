import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'
import NoteContainer from '../../components/NoteContainer/NoteContainer';
import NoteForm from '../NoteForm/NoteForm';
import { storeNote } from '../../actions';
import { getNotes } from '../../helpers/apiCalls';
import './App.css';

export class App extends Component {


  componentDidMount = async (notes) => {
    if (!notes) {
      const allNotes = await getNotes();
      await allNotes.forEach(note => {
        this.props.storeNote(note)
      })
    }
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Trapper Keeper
        </header>
        {/* <NoteContainer notes={this.state.notes}/> */}
        <Route path='/' component={ NoteContainer } />
        <Route path='/new-note' component={ NoteForm } />
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  notes: state.notes
})

export const mapDispatchToProps = (dispatch) => ({
  storeNote: (note) => dispatch(storeNote(note))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
