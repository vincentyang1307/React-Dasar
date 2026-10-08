import { useState, useEffect } from 'react';
import './App.css';

function TodoList(props) {
  return (
    <ul className="todo-list">
      {props.todos.map((todo) => (
        <li className="todo-item" key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => props.onComplete(todo.id)}
          />

          {todo.text}

          <button
            className="btn-delete"
            onClick={() => props.onDelete(todo.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );  
}

function App() {
  const saved = localStorage.getItem('todos');
  const [todos, setTodos] = useState(saved ? JSON.parse(saved) : []);
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    if (inputText.trim() === '') {
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setInputText('');
  }

  function toggleComplete(id) {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodos(newTodos);
  }

  function deleteTodo(id) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  const displayedTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'done') return todo.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>TODO APP</h1>

      <div className="input-area">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <button onClick={addTodo}>Add</button>
      </div>

      <div className="filter-area">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('done')}>Completed</button>
      </div>

      {todos.length === 0 && <p>No todos yet</p>}

      <TodoList
        todos={displayedTodos}
        onComplete={toggleComplete}
        onDelete={deleteTodo}
      />
    </div>
  );
}

export default App;