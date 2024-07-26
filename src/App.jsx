import React, {useState, useEffect} from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function useSemiPersistentState() {

  const savedTodoList = JSON.parse(localStorage.getItem('savedTodoList')) || [];
  const [todoList, setTodoList] = useState(savedTodoList);

  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];
}

function App() {

  const [todoList, setTodoList] = useSemiPersistentState();

  const addTodo = (newTodo) =>
    setTodoList([...todoList, newTodo]);

  return (
    <>
      <h1>Todo List</h1>
      <TodoList todoList={todoList}/>
      <AddTodoForm onAddTodo={addTodo} />
    </>
  );
}

export default App;