import React from 'react';
import './App.css';

const todoList = [
  { id: 1, title: "Complete assignment" },
  { id: 2, title: "Do laundry" },
  { id: 3, title: "Read a book" }
];

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;