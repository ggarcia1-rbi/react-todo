import React from 'react';
import './App.css';

function TodoListItem( {todo, onRemoveTodo} ){
    return(
        <li>
            {todo.title}
            <button className="removeButton" type="button" onClick={() => onRemoveTodo(todo.id)}>
                Remove
            </button>
        </li>
    );
}
export default TodoListItem;