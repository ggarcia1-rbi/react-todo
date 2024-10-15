import React from 'react';
import TodoListItem from './TodoListItem';
import PropTypes from 'prop-types';
import '../App.css';

function TodoList({todoList, onRemoveTodo}) {
  return (
    <ul className='todoList'>
      {todoList.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;

