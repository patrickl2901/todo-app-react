import { useState, useEffect, createContext } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import TodoUI from "./components/TodoUI.jsx";

export const ThemeContext = createContext({});

function App() {
  const [theme, setTheme] = useState("dark");

  const appStyle = {
    light: {
      backgroundColor: "var(--very-light-grayish-blue)",
    },
    dark: {
      backgroundColor: "var(--very-dark-blue-dt)",
    },
    common: {
      transition: "all 0.75s ease",
    },
  };

  useEffect(() => {
    theme === "dark"
      ? document.documentElement.style.setProperty(
          "--html-bg",
          appStyle.dark.backgroundColor
        )
      : document.documentElement.style.setProperty(
          "--html-bg",
          appStyle.light.backgroundColor
        );
  }, [theme]);

  const themeStyle = {
    ...appStyle.common,
    ...(theme === "dark" ? appStyle.dark : appStyle.light),
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="App" style={themeStyle}>
        <Header />
        <TodoUI />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
