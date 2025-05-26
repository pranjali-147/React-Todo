import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  let [todos, setTodos] = useState([
    { task: "sample-task", id: uuidv4(), isDone: false },
  ]);
  let [newTodo, setNewTodo] = useState("");
  let [editId, setEditId] = useState(null);

  let addNewTask = () => {
    if (editId) {
      // Update existing task
      let updatedTodos = todos.map((todo) =>
        todo.id === editId ? { ...todo, task: newTodo, isDone: false } : todo
      );
      setTodos(updatedTodos);
      setEditId(null);
    } else {
      setTodos((prevTodos) => [
        ...prevTodos,
        { task: newTodo, id: uuidv4(), isDone: false },
      ]);
    }
    setNewTodo("");
  };

  let updateTodovalue = (e) => {
    setNewTodo(e.target.value);
  };

  let deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    if (editId === id) {
      setEditId(null);
      setNewTodo("");
    }
  };

  let editTodo = (id) => {
    let selectedTodo = todos.find((todo) => todo.id === id);
    setNewTodo(selectedTodo.task);
    setEditId(id);
  };

  let markAll = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        return {
          ...todo,
          isDone: true,
        };
      })
    );
  };

  let markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id == id) {
          return {
            ...todo,
            isDone: true,
          };
        } else {
          return todo;
        }
      })
    );
  };

  return (
    <div>
      <h3>Todo List</h3>
      <input
        type="text"
        value={newTodo}
        onChange={updateTodovalue}
        placeholder="Enter task"
      />
      <button onClick={addNewTask}>
        {editId ? "Update Task" : "Add Task"}
      </button>
      <br />

      <ul>
        {todos.map((todo) => (
          <div className="box">
            <li key={todo.id}>
              <span
                style={
                  todo.isDone ? { textDecorationLine: "line-through" } : {}
                }
              >
                {todo.task}
              </span>
            </li>
            <div>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button onClick={() => editTodo(todo.id)}>Edit</button>
              <button onClick={() => markAsDone(todo.id)}>Done</button>
            </div>
          </div>
        ))}
      </ul>
      <button onClick={markAll}>Mark All as Done</button>
    </div>
  );
}
