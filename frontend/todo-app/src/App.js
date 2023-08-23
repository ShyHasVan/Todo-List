import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (!newTodo) return;
    try {
      await axios.post('http://localhost:3001/todos', {
        description: newTodo,
      });
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleCompletion = async (id, completed) => {
    try {
      await axios.patch(`http://localhost:3001/todos/${id}`, {
        completed: !completed,
      });
      fetchTodos();
    } catch (error) {
      console.error('Error toggling completion:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const uncompletedTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const editTaskDescription = (description) => {
    setEditDescription(description);
  };

  const updateTaskDescription = async (id) => {
    try {
      await axios.patch(`http://localhost:3001/todos/${id}`, {
        description: editDescription,
      });
      setEditDescription('');
      fetchTodos();
    } catch (error) {
      console.error('Error updating description:', error);
    }
  };

  return (
    <div className="container mt-5 vh-100 d-flex flex-column">
      <h1 className="mb-4">Todo List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="btn btn-primary" type="button" onClick={addTodo}>
          Add
        </button>
      </div>
      <div className="uncomplete-section">
        <h2 className="mb-3">Uncomplete</h2>
        <ul className="list-group">
          {uncompletedTodos.map((todo) => (
            <li key={todo._id} className="list-group-item mb-3 card hover-effect">
              <div className="card-body d-flex justify-content-between align-items-center">
                {editDescription === todo.description ? (
                  <input
                    type="text"
                    className="form-control"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                ) : (
                  <span className={`card-text ${todo.completed ? 'completed' : ''}`}>
                    {todo.description}
                  </span>
                )}
                <div>
                  {editDescription === todo.description ? (
                    <>
                      <button className="btn btn-success mr-2" onClick={() => updateTaskDescription(todo._id)}>
                        <FaEdit /> Update
                      </button>
                      <button className="btn btn-danger" onClick={() => deleteTodo(todo._id)}>
                        <FaTrash /> Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-secondary mr-2" onClick={() => editTaskDescription(todo.description)}>
                        <FaEdit /> Edit Description
                      </button>
                      <button className="btn btn-secondary mr-2" onClick={() => toggleCompletion(todo._id, todo.completed)}>
                        {todo.completed ? (
                         <>
                          <FaCheck /> Mark Incomplete
                        </>
                      ) : (
                         <>
                          <FaCheck /> Mark Complete
                        </>
                       )}
                      </button>
                      <button className="btn btn-danger" onClick={() => deleteTodo(todo._id)}>
                        <FaTrash /> Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="complete-section">
        <h2 className="mb-3">Complete</h2>
        <ul className="list-group">
          {completedTodos.map((todo) => (
            <li key={todo._id} className="list-group-item mb-3 card hover-effect">
              <div className="card-body d-flex justify-content-between align-items-center">
                <span className={`card-text completed`}>{todo.description}</span>
                <div>
                  <button className="btn btn-secondary mr-2" onClick={() => toggleCompletion(todo._id, todo.completed)}>
                    <FaCheck /> Mark Incomplete
                  </button>
                  <button className="btn btn-danger" onClick={() => deleteTodo(todo._id)}>
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
