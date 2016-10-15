import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const count = (state = 0, action = {}) => {
  console.log(action);
  switch (action.type) {
  case 'INCREMENT':
    return state + 1;
  case 'DECREMENT':
    return (state < 1) ? state : state - 1;
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
  count: count(),
  name: name(),
};

const reduce = (state = initialState, action) => ({
  count: count(state.count, action),
  name: name(state.name, action),
});

const Counter = ({ count, dispatch }) => (
  <div>
    <h1>{count}</h1>
    <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
  </div>
);

class NameBox extends React.Component {
  render() {
    return (
      <div style={{ marginTop: 40 }} className='NameBox'>
        <label htmlFor='name'>Site Name:</label>
        <input
          type='text'
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

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{this.state.name}</h2>
        </div>
        <Counter dispatch={this.dispatch} count={this.state.count} />
        <NameBox dispatch={this.dispatch} name={this.state.name} />
      </div>
    );
  }
}

export default App;
