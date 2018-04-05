const defaultState = [
  {
    id: 1,
    title: 'About',
    slug: 'about'
  },
  {
    id: 2,
    title: 'Contact',
    slug: 'contact'
  }
]

function reducer(state = defaultState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer