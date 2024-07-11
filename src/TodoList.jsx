import React from 'react';

const todoList = [
  { id: 1, title: "Complete assignment" },
  { id: 2, title: "Do laundry" },
  { id: 3, title: "Read a book" }
];

function TodoList() {
  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

export default TodoList;
