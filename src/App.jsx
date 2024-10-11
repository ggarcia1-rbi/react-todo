import React, {useState, useEffect} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDescending, setIsDescending] = useState(false);

  const fetchData = async () => {
    const sortDirection = isDescending ? 'desc' : 'asc';
    //const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    //const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view`;
    //const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`;
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?sort[0][field]=title&sort[0][direction]=${sortDirection}`;

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    try{
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      const todos = data.records.map((record) => ({
        id: record.id,
        title: record.fields.title,
        createdAt: record.createdTime,
      }));

      //todos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      
      
      setTodoList(todos);
      setIsLoading(false);
      
    }catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isDescending]);

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
        throw new Error(`Error: ${response.status}`);
      }

      const newTodo = await response.json();
      const updatedTodoList = [...todoList, { id: newTodo.id, title: newTodo.fields.title }];
    
      updatedTodoList.sort((a, b) => {
        const comparison = a.title.localeCompare(b.title);
        return isDescending ? -comparison : comparison;
      });
  
      setTodoList(updatedTodoList);

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
        throw new Error(`Error: ${response.status}`);
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
        <Route 
          path="/" 
          element={
            <>
              <h1>Todo List</h1>
              <div className="toggle-container">
                <label>Sort Descending</label>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={isDescending}
                    onChange={() => setIsDescending(!isDescending)}
                    className="toggle-checkbox"
                    id="sortToggle"
                  />
                  <label className="toggle-label" htmlFor="sortToggle"></label>
                </div>
              </div>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
                  <AddTodoForm onAddTodo={postTodo} />
                </>
              )}
            </>
          } 
        />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </Router>
  );
}

export default App;