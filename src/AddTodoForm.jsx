import React from 'react';

// Declare the AddTodoForm function component
function AddTodoForm() {
  return (
    <form className='formContainer'>
      <label htmlFor="todoTitle">Title </label>
      <input type="text" id="todoTitle" />
      <button type="submit">Add</button>
    </form>
  );
}

// Export the component as the default export
export default AddTodoForm;