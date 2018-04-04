import React, { Component } from 'react'

import TodoList from '../components/TodoList'

class Todo extends Component {
  render() {
    return (
      <div className='c-b-light-gray'>
        <div className='row p-tb-6'>
          <div className='col-6'>
            <h3 className='m-t-0'>TodoList</h3>
            <p>Click on a todo list item to cross it out.</p>
          </div>
          <div className='col-6'>
            <TodoList />
          </div>
        </div>
      </div>
    )
  }
}

export default Todo
