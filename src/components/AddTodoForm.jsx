import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './InputField.module.css';

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
    <form onSubmit={handleAddTodo}>
      <div className={styles.formContainer}>
        <input
          type="text"
          value={todoTitle}
          onChange={handleTitleChange}
          placeholder=" "
          className={styles.inputField}
        />
        <label className={styles.inputLabel}>Title</label>
        <span className={styles.inputHighlight}></span>
      </div>
      <button type="submit" className={styles.addButton}>Add</button>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;

