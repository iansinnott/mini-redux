import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const count = (state, action) => {
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

class Counter extends React.Component {
  state = { count: 0 };

  dispatch = (action) => {
    this.setState(state => ({
      count: count(state.count, action),
    }));
  };

  increment = () => {
    this.dispatch({ type: 'INCREMENT' });
  };

  decrement = () => {
    this.dispatch({ type: 'DECREMENT' });
  };

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Counter />
      </div>
    );
  }
}

export default App;
