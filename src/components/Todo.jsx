import React, { useContext } from "react";
import { ThemeContext } from "../App";
import CrossIcon from "./CrossIcon.jsx";
import CheckIcon from "./CheckIcon";
import "./Todo.css";

function Todo(props) {
  const { theme } = useContext(ThemeContext);

  const todoStyle = {
    light: {
      backgroundColor: "#FFF",
      color: "#000",
      borderBottom: "1px solid var(--light-grayish-blue)",
    },
    dark: {
      backgroundColor: "var(--very-dark-desaturated-blue-dt)",
      color: "#FFF",
      borderBottom: "1px solid var(--very-dark-grayish-blue-dt)",
    },
    common: {
      transition: "all 0.75s ease",
    },
  };

  const checkBtnStyle = {
    borderBottom: "0",
    backgroundColor: "var(--check-btn-bg)",
    transition: "all 0.75s ease",
  };

  const checkBtnStyleCompleted = {
    backgroundImage: "var(--check-background)",
  };

  const todoTextStyleCompleted = {
    light: {
      color: "var(--dark-grayish-blue)",
      textDecoration: "line-through",
    },
    dark: {
      color: "var(--dark-grayish-blue-dt)",
      textDecoration: "line-through",
    },
  };

  const todoTextStyleTheme = {
    ...(theme === "dark"
      ? todoTextStyleCompleted.dark
      : todoTextStyleCompleted.light),
  };

  const themeStyle = {
    ...todoStyle.common,
    ...(theme === "dark" ? todoStyle.dark : todoStyle.light),
  };

  return (
    <div className={"Todo"} style={themeStyle}>
      <div className="todo-content">
        <button
          className="check-btn"
          onClick={props.completeTodo}
          style={
            props.completed === true ? checkBtnStyleCompleted : checkBtnStyle
          }
        >
          {props.completed === true ? <CheckIcon /> : <></>}
        </button>
        <div className="todo-text" onClick={props.completeTodo}>
          <p style={props.completed === true ? todoTextStyleTheme : null}>
            {props.text}
          </p>
        </div>
      </div>
      <button className="delete-btn" onClick={props.deleteTodo}>
        <CrossIcon />
      </button>
    </div>
  );
}

export default Todo;
