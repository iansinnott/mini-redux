import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Counter extends React.Component {
  state = { count: 0 };

  increment = () => {
    this.setState(state => ({
      count: state.count + 1,
    }));
  };

  decrement = () => {
    this.setState(state => ({
      count: state.count ? state.count - 1 : state.count,
    }));
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
