import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import NoteContainer from '../../components/NoteContainer/NoteContainer'
import NoteForm from '../NoteForm/NoteForm'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Trapper Keeper
        </header>
        <Route path='/' component={ NoteContainer } />
        <Route path='/new-note' component={ NoteForm } />
      </div>
    );
  }
}

export default App;
