// Count reducer. Stores an array of counts.
export const count = (state = [], action = {}) => {
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

// Site name reducer. Stores the "name" of the site which is displayed at the
// top above the counters
export const name = (state = 'Welcome to React', action = {}) => {
  switch (action.type) {
  case 'SET_NAME':
    return action.payload;
  default:
    return state;
  }
};

