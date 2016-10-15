import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const count = (state = [], action = {}) => {
  const { type, payload: index } = action;
  let nextState;
  switch (type) {
  case 'INCREMENT':
    nextState = state.slice();
    nextState[index] = nextState[index] + 1;
    return nextState;
  case 'DECREMENT':
    if (state[index] < 1) return state;
    nextState = state.slice();
    nextState[index] = nextState[index] - 1;
    return nextState;
  case 'ADD_COUNTER':
    return state.concat([0]);
  case 'REMOVE_COUNTER':
    return [
      ...state.slice(0, index),
      ...state.slice(index + 1),
    ];
  default:
    return state;
  }
};

const name = (state = 'Welcome to React', action = {}) => {
  switch (action.type) {
  case 'SET_NAME':
    return action.payload;
  default:
    return state;
  }
};

const initialState = {
  count: count([0]), // Default to a single counter
  name: name(),
};

const reduce = (state = initialState, action) => ({
  count: count(state.count, action),
  name: name(state.name, action),
});

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
    console.log(this.state);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{this.state.name}</h2>
        </div>
        <NameBox dispatch={this.dispatch} name={this.state.name} />
        {this.state.count.map((count, i) => (
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
