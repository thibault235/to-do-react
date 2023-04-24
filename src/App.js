import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);


  useEffect(() => {
    const localStorageTodos = JSON.parse(localStorage.getItem("todos"));
    if (localStorageTodos) setTodos(localStorageTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (event) => {
    event.preventDefault();
    const newTodo = { id: uuidv4(), text: inputText, completed: false };
    setTodos([...todos, newTodo]);
    setInputText("");
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  const toggleCompleted = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const editTodo = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.text = inputText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setInputText("");
  };

  const handleEditTodo = (id) => {
    setInputText(todos.find(todo => todo.id === id).text);
    editTodo(id);
  };

  const moveTodoUp = (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    if (index === 0) return; // already at the top
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    updatedTodos.splice(index - 1, 0, todos[index]);
    setTodos(updatedTodos);
  };

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans mt-20">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <h1 className="text-3xl md:text-4xl text-indigo-600 font-medium mb-2">To-Do List</h1>
        <div className="flex mt-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
            type="text"
            placeholder="Add Todo"
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
          />
          <button
            className="p-2 border border-indigo-600 rounded text-white bg-indigo-600 transition-colors duration-300 mt-1 md:mt-0 md:mx-2"
            onClick={addTodo}
          >
            Add
          </button>
        </div>
        <div id="listBox">
          {todos.map((todo) => (
            <div className="flex mb-4 items-center" key={todo.id}>
              <p className={`w-full text-grey-darkest ${todo.completed ? "line-through" : ""}`}>{todo.text}</p>
              <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-white text-grey bg-green-600" onClick={() => handleEditTodo(todo.id)}>Edit</button>
              <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-white bg-red-500" onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-white bg-blue-500" onClick={() => toggleCompleted(todo.id)}>{todo.completed ? "Undone" : "Done"}</button>
              <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-white bg-yellow-500" onClick={() => moveTodoUp(todo.id)}>Up</button>
            </div>
          
          ))}
        </div>
      </div>
    </div>
  );
}
export default App;
