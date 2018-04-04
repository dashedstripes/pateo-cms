const defaultState = 'ALL'

function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'SET_FILTER': {
      return action.payload
    }
    default:
      return state
  }
}

export default reducer