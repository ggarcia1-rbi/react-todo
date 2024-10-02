import React, {useState} from 'react';
import './App.css';
import InputWithLabel from './InputWithLabel';

function AddTodoForm({ onAddTodo }) {
  const[todoTitle, setTodoTitle] = useState("");
  
  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo({ title: todoTitle });
    setTodoTitle("");
  }
  return (
    <form className="formContainer" onSubmit={handleAddTodo}>
      <InputWithLabel
        id="todoTitle"
        value={todoTitle}
        onInputChange={handleTitleChange}
      >
        Title
      </InputWithLabel>
      <button type="submit">Add</button>
    </form>
  );
}


export default AddTodoForm;

