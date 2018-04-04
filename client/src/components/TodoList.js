import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setFilter } from '../actions/filterActions'
import { createTodo, todoCompleted } from '../actions/todoActions'

class TodoList extends Component {
  constructor() {
    super()

    this.state = {
      input: '',
      filters: [
        {
          id: 1,
          active: true,
          type: 'ALL'
        },
        {
          id: 2,
          active: false,
          type: 'INCOMPLETE'
        },
        {
          id: 3,
          active: false,
          type: 'COMPLETED'
        }
      ]
    }
  }

  updateInput(e) {
    this.setState({
      input: e.target.value
    })
  }

  inputKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.dispatch(createTodo(this.state.input))
      this.setState({
        input: ''
      })
    }
  }

  markCompletedTodo(index) {
    this.props.dispatch(todoCompleted(index))
  }

  setFilter(filter, id, e) {
    e.preventDefault()
    this.props.dispatch(setFilter(filter))

    this.setState({
      filters: this.state.filters.map((filter) => {
        if (filter.id === id) {
          filter.active = true
        } else {
          filter.active = false
        }
        return filter
      })
    })
  }

  render() {
    const todolis = this.props.todos.map((todo) => {
      if (this.props.filter === 'ALL') {
        return (
          <li key={todo.id} onClick={this.markCompletedTodo.bind(this, todo.id)}>
            {todo.completed ? <strike>{todo.title}</strike> : todo.title}
          </li>
        )
      } else if (this.props.filter === 'COMPLETED') {
        if (todo.completed) {
          return (
            <li key={todo.id} onClick={this.markCompletedTodo.bind(this, todo.id)}>
              <strike>{todo.title}</strike>
            </li>
          )
        }
      } else if (this.props.filter === 'INCOMPLETE') {
        if (!todo.completed) {
          return (
            <li key={todo.id} onClick={this.markCompletedTodo.bind(this, todo.id)}>
              {todo.title}
            </li>
          )
        }
      }
    })

    const filters = this.state.filters.map((filter) => {
      if (filter.active) {
        return (
          <a key={filter.id} className='m-r-1 t-b' onClick={this.setFilter.bind(this, filter.type, filter.id)}>{filter.type}</a>
        )
      } else {
        return (
          <a key={filter.id} className='m-r-1' onClick={this.setFilter.bind(this, filter.type, filter.id)}>{filter.type}</a>
        )
      }
    })

    return (
      <div>
        {filters}
        <ul className='p-l-1'>
          {todolis}
        </ul>
        <input
          type='text'
          value={this.state.input}
          onChange={this.updateInput.bind(this)}
          onKeyPress={this.inputKeyPress.bind(this)}
          placeholder='Enter a new todo...' />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    filter: state.filter,
    todos: state.todos
  }
}

export default connect(mapStateToProps)(TodoList)
