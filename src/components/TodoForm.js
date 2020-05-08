import React from 'react'

export default props =>
  <form onSubmit = {props.handleTodoSubmit}>
    <input
      type='text'
      autoFocus
      onChange = {props.handleNewTodoChange}
      value = {props.currentTodo}
      className="new-todo"
      placeholder="What needs to be done?"/>
  </form>
