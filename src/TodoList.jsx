import React from 'react';

// Declare the todoList array
const todoList = [
  { id: 1, title: "Complete assignment" },
  { id: 2, title: "Do laundry" },
  { id: 3, title: "Read a book" }
];

// Declare the TodoList function component
function TodoList() {
  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

// Export the component as the default export
export default TodoList;