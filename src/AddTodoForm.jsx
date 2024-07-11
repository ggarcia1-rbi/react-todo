import React from 'react';

function AddTodoForm({ onAddTodo }) {
    function handleAddTodo(event) {
        event.preventDefault();
        const todoTitle = event.target.elements.title.value;
        onAddTodo(todoTitle);
        event.target.reset();
    }
  return (
    <form className='formContainer' onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title </label>
      <input type="text" id="todoTitle" name="title"/>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;