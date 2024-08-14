import React from 'react';
import TodoListItem from './TodoListItem';
import './App.css';

function TodoList({todoList, onRemoveTodo}) {
  return (
    <ul className='todoList'>
      {todoList.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />
      ))}
    </ul>
  );
}

export default TodoList;

