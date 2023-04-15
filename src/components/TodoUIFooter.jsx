import React, { useState, useContext } from "react";
import "./TodoUIFooter.css";
import { ThemeContext } from "../App";

function TodoUIFooter(props) {
  const { theme } = useContext(ThemeContext);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const todoUIFooterStyle = {
    light: {
      backgroundColor: "#FFF",
      color: "var(--dark-grayish-blue)",
    },
    dark: {
      backgroundColor: "var(--very-dark-desaturated-blue-dt)",
      color: "var(--dark-grayish-blue-dt)",
    },
    common: {
      transition: "all 0.75s ease",
    },
  };

  const themeStyle = {
    ...todoUIFooterStyle.common,
    ...(theme === "dark" ? todoUIFooterStyle.dark : todoUIFooterStyle.light),
  };

  const clearCompletedStyle = {
    color:
      isHover === true
        ? theme === "dark"
          ? "#FFF"
          : "var(--very-dark-grayish-blue)"
        : themeStyle.color,
  };

  return (
    <div className="TodoUIFooter" style={themeStyle}>
      <p>
        {props.items} {props.items === 1 ? "item" : "items"} left
      </p>
      <div className="filter-btns">
        <button
          style={
            props.selectedFilter === "All"
              ? { color: "var(--bright-blue)" }
              : props.filterAllStyle
          }
          onMouseEnter={props.allMouseEnter}
          onMouseLeave={props.allMouseLeave}
          onClick={props.toggleFilter}
        >
          All
        </button>
        <button
          style={
            props.selectedFilter === "Active"
              ? { color: "var(--bright-blue)" }
              : props.filterActiveStyle
          }
          onMouseEnter={props.activeMouseEnter}
          onMouseLeave={props.activeMouseLeave}
          onClick={props.toggleFilter}
        >
          Active
        </button>
        <button
          style={
            props.selectedFilter === "Completed"
              ? { color: "var(--bright-blue)" }
              : props.filterCompletedStyle
          }
          onMouseEnter={props.completedMouseEnter}
          onMouseLeave={props.completedMouseLeave}
          onClick={props.toggleFilter}
        >
          Completed
        </button>
      </div>
      <button
        onClick={props.clearCompleted}
        style={clearCompletedStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Clear Completed
      </button>
    </div>
  );
}

export default TodoUIFooter;
