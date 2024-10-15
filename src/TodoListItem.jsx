import React, {useState, useEffect} from 'react';
import './App.css';
import styles from './TodoListItem.module.css';

function TodoListItem( {todo, onRemoveTodo} ){
    const [isShown, setIsShown] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsShown(true), 10);
    }, []);

    const handleRemoveClick = () => {
        setIsRemoving(true);
        setTimeout(() => onRemoveTodo(todo.id), 600);
    };

  return (
    <li className={`${styles.ListItem} ${isShown ? styles.show : ''} ${isRemoving ? styles.remove : ''}`}>
      {todo.title}
      <button className="removeButton" type="button" onClick={handleRemoveClick}>
        Remove
      </button>
    </li>
  );
}
  
  export default TodoListItem;