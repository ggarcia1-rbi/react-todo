import React from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';


function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <TodoList />
      <AddTodoForm />
    </div>
  );
}

export default App;