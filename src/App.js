import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { counts, name } from './reducers.js'

/**
 * NOTE: This is different than the redux version but the idea is the same.
 *
 * The output ends up putting together something like this:
 *
 * ```
 *     const reduce = (state = {}, action) => ({
 *       count: count(state['count'], action),
 *       name: name(state['name'], action),
 *     });
 * ```
 */
const combineReducers = (reducers) => {
  const keys = Object.keys(reducers);

  return function combination(state = {}, action) {
    const nextState = {};

    keys.forEach((k) => {
      const reducer = reducers[k];
      nextState[k] = reducer(state[k], action);
    });

    return nextState;
  }
};

const reduce = combineReducers({ counts, name });

const Counter = ({ index, count, dispatch }) => (
  <div className='Counter' data-index={index}>
    <h1>{count}</h1>
    <button onClick={() => dispatch({ type: 'DECREMENT', payload: index })}>-</button>
    <button onClick={() => dispatch({ type: 'INCREMENT', payload: index })}>+</button>
    <button
      className='removeButton'
      onClick={() => dispatch({ type: 'REMOVE_COUNTER', payload: index })}>
      ✖
    </button>
  </div>
);

class NameBox extends React.Component {
  render() {
    return (
      <div className='NameBox'>
        <input
          type='text'
          placeholder='Site Name...'
          value={this.props.name}
          onChange={e => this.props.dispatch({
            type: 'SET_NAME',
            payload: e.target.value,
          })}
        />
      </div>
    );
  }
}

class App extends Component {
  state = reduce();

  // Dispatch implements a logger to imitate some sort of logger middleware.
  dispatch = (action) => {
    console.info(`DISPATCH: ${action.type}`, action.payload);
    this.setState(state => reduce(state, action), () => {
      console.info('NEXT STATE:', this.state);
    });
  };

  handleAddCounter = () => {
    this.dispatch({ type: 'ADD_COUNTER' });
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{this.state.name}</h2>
        </div>
        <NameBox dispatch={this.dispatch} name={this.state.name} />
        {this.state.counts.map((count, i) => (
          <Counter key={i} index={i} dispatch={this.dispatch} count={count} />
        ))}
        <button
          className='addCounter'
          onClick={this.handleAddCounter}>
          Add Counter
        </button>
      </div>
    );
  }
}

export default App;
