import React, {useState, useEffect} from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { todoList: JSON.parse(localStorage.getItem('savedTodoList')) || [] } });
      }, 2000);
    });

    fetchData.then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = (newTodo) => setTodoList([...todoList, newTodo]);

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  if (isLoading) {
    return (
      <>
        <h1>Todo List</h1>
        <p>Loading...</p>
        <AddTodoForm onAddTodo={addTodo} />
      </>
    );
  } else {
    return (
      <>
        <h1>Todo List</h1>
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        <AddTodoForm onAddTodo={addTodo} />
      </>
    );
  }
}

export default App;