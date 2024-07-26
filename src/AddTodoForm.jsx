import React from 'react';

function AddTodoForm() {
  return (
    <form className='formContainer'>
      <label htmlFor="todoTitle">Title </label>
      <input type="text" id="todoTitle" />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;
