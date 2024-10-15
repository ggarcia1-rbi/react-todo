import React, {useState, useEffect} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    try{
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      const todos = data.records.map((record) => ({
        id: record.id,
        title: record.fields.title,
        createdAt: record.createdTime,
      }));

      todos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      
      setTodoList(todos);
      setIsLoading(false);
      
    }catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const postTodo = async (todo) => {
    const airtableData = {
      fields: {
        title: todo.title,
      },
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
      body: JSON.stringify(airtableData),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new error(`Error: ${response.status}`);
      }

      const newTodo = await response.json();
      setTodoList([...todoList, { id: newTodo.id, title: newTodo.fields.title }]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const removeTodo = async (id) => {
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`;
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new error(`Error: ${response.status}`);
      }

      const updatedTodoList = todoList.filter((todo) => todo.id !== id);
      setTodoList(updatedTodoList);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" 
        element={
          <>
            <h1>Todo List</h1>
            <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
            <AddTodoForm onAddTodo={postTodo} />
          </>
        } />
        <Route path="/new" 
        element={<h1>New Todo List</h1>} />
      </Routes>
    </Router>
);
}

export default App;