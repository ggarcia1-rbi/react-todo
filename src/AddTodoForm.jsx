import React, {useState} from 'react';
import './App.css';

function AddTodoForm({ onAddTodo }) {
  const[todoTitle, setTodoTitle] = useState("");
  
  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo({ title: todoTitle, id: Date.now() });
    setTodoTitle("");
  }
  return (
    <form className='formContainer' onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title </label>
      <input type="text" id="todoTitle" value={todoTitle} onChange={handleTitleChange}/>
      <button type="submit">Add</button>
    </form>
  );
}


export default AddTodoForm;

