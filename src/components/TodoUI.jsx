import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { ThemeContext } from "../App";
import Todo from "./Todo";
import TodoUIFooter from "./TodoUIFooter";
import "./TodoUI.css";

function TodoUI() {
  const { theme } = useContext(ThemeContext);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [allHover, setAllHover] = useState(false);
  const [activeHover, setActiveHover] = useState(false);
  const [completedHover, setCompletedHover] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");

  // handle mouseover states for filter buttons
  const handleAllMouseEnter = () => {
    setAllHover(true);
  };
  const handleAllMouseLeave = () => {
    setAllHover(false);
  };

  const handleActiveMouseEnter = () => {
    setActiveHover(true);
  };
  const handleActiveMouseLeave = () => {
    setActiveHover(false);
  };

  const handleCompletedMouseEnter = () => {
    setCompletedHover(true);
  };
  const handleCompletedMouseLeave = () => {
    setCompletedHover(false);
  };

  // set selected filter on button click
  const toggleFilter = (event) => {
    setSelectedFilter(event.target.innerText);
  };

  // return todos with selected filter applied
  const filterTodos = (todo) => {
    if (selectedFilter === "All") {
      return todo;
    } else if (selectedFilter === "Active") {
      return todo.completed === false ? todo : null;
    } else if (selectedFilter === "Completed") {
      return todo.completed === true ? todo : null;
    }
  };

  const handleOnChange = (event) => {
    setNewTodo(event.target.value);
  };

  const generateTodoId = () => {
    return Math.floor(Math.random() * 1000);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (newTodo !== "") {
      setTodos([
        ...todos,
        {
          id: generateTodoId(),
          content: newTodo,
          completed: false,
        },
      ]);
    }
    setNewTodo("");
  };

  const handleDeleteTodo = (todo) => {
    setTodos(todos.filter((otherTodo) => otherTodo !== todo));
  };

  const toggleCompleted = (todoToComplete) => {
    setTodos(
      todos.map((todo) => {
        if (todo === todoToComplete) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter((otherTodo) => otherTodo.completed !== true));
  };

  useEffect(() => {
    console.log("todos: ", todos);
  }, [todos]);

  // set check button background to theme color on hover
  useEffect(() => {
    theme === "dark"
      ? document.documentElement.style.setProperty(
          "--check-btn-bg",
          todoUIStyle.dark.backgroundColor
        )
      : document.documentElement.style.setProperty(
          "--check-btn-bg",
          todoUIStyle.light.backgroundColor
        );
  }, [theme]);

  const todoUIStyle = {
    light: {
      backgroundColor: "#FFF",
    },
    dark: {
      backgroundColor: "var(--very-dark-desaturated-blue-dt)",
    },
    common: {
      transition: "all 0.75s ease",
    },
  };

  const inputStyle = {
    light: {
      color: "#000",
    },
    dark: {
      color: "#FFF",
    },
  };

  const filterStyle = {
    light: {
      color: "var(--dark-grayish-blue)",
    },
    dark: {
      color: "var(--dark-grayish-blue-dt)",
    },
  };

  const themeStyle = {
    ...todoUIStyle.common,
    ...(theme === "dark" ? todoUIStyle.dark : todoUIStyle.light),
  };

  // mouseover state styles for filter buttons
  const filterAllStyle = {
    color:
      allHover === true
        ? theme === "dark"
          ? "#FFF"
          : "var(--very-dark-grayish-blue)"
        : theme === "dark"
        ? filterStyle.dark.color
        : filterStyle.light.color,
  };

  const filterActiveStyle = {
    color:
      activeHover === true
        ? theme === "dark"
          ? "#FFF"
          : "var(--very-dark-grayish-blue)"
        : theme === "dark"
        ? filterStyle.dark.color
        : filterStyle.light.color,
  };

  const filterCompletedStyle = {
    color:
      completedHover === true
        ? theme === "dark"
          ? "#FFF"
          : "var(--very-dark-grayish-blue)"
        : theme === "dark"
        ? filterStyle.dark.color
        : filterStyle.light.color,
  };

  return (
    <main id="main">
      <div className="create-todo-box" style={themeStyle}>
        <form onSubmit={handleOnSubmit}>
          <input
            className="check-btn"
            type="submit"
            value=""
            style={themeStyle}
          />
          <input
            className="create-todo-input"
            type="text"
            placeholder="Create a new todo..."
            onChange={handleOnChange}
            value={newTodo}
            style={theme === "dark" ? inputStyle.dark : inputStyle.light}
          />
        </form>
      </div>
      <div className="todos">
        {todos.filter(filterTodos).map((todo) => {
          return (
            <Todo
              text={todo.content}
              completed={todo.completed}
              deleteTodo={() => handleDeleteTodo(todo)}
              completeTodo={() => toggleCompleted(todo)}
              key={todo.id}
            />
          );
        })}
        {todos.length > 0 ? (
          <TodoUIFooter
            items={todos.length}
            clearCompleted={handleClearCompleted}
            allMouseEnter={handleAllMouseEnter}
            allMouseLeave={handleAllMouseLeave}
            activeMouseEnter={handleActiveMouseEnter}
            activeMouseLeave={handleActiveMouseLeave}
            completedMouseEnter={handleCompletedMouseEnter}
            completedMouseLeave={handleCompletedMouseLeave}
            toggleFilter={toggleFilter}
            selectedFilter={selectedFilter}
            filterAllStyle={filterAllStyle}
            filterActiveStyle={filterActiveStyle}
            filterCompletedStyle={filterCompletedStyle}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="todo-filter-box-mobile" style={themeStyle}>
        <button
          style={
            selectedFilter === "All"
              ? { color: "var(--bright-blue)" }
              : filterAllStyle
          }
          onMouseEnter={handleAllMouseEnter}
          onMouseLeave={handleAllMouseLeave}
          onClick={toggleFilter}
        >
          All
        </button>
        <button
          style={
            selectedFilter === "Active"
              ? { color: "var(--bright-blue)" }
              : filterActiveStyle
          }
          onMouseEnter={handleActiveMouseEnter}
          onMouseLeave={handleActiveMouseLeave}
          onClick={toggleFilter}
        >
          Active
        </button>
        <button
          style={
            selectedFilter === "Completed"
              ? { color: "var(--bright-blue)" }
              : filterCompletedStyle
          }
          onMouseEnter={handleCompletedMouseEnter}
          onMouseLeave={handleCompletedMouseLeave}
          onClick={toggleFilter}
        >
          Completed
        </button>
      </div>
    </main>
  );
}

export default TodoUI;
