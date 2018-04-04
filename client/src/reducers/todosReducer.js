const defaultState = [
  {
    id: 1,
    title: 'Buy Butter',
    completed: false,
    visible: true
  },
  {
    id: 2,
    title: 'Pick up laundry',
    completed: false,
    visible: true
  }
]

function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'CREATE_TODO': {
      return [...state].concat(action.payload)
    }
    case 'TODO_COMPLETED':
      return [...state].map((todo) => {
        if (todo.id === action.payload) {
          todo.completed = !todo.completed
          todo.visible = !todo.visible
        }
        return todo
      })
    default:
      return state
  }
}

export default reducer