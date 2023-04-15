import "./Header.css";
import SunIcon from "./SunIcon";
import MoonIcon from "./MoonIcon";
import mobileBgDark from "../assets/bg-mobile-dark.jpg";
import mobileBgLight from "../assets/bg-mobile-light.jpg";
import desktopBgDark from "../assets/bg-desktop-dark.jpg";
import desktopBgLight from "../assets/bg-desktop-light.jpg";
import { useContext } from "react";
import { ThemeContext } from "../App";

function Header() {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header id="header">
      <div className="header-bg">
        <img
          src={theme === "dark" ? mobileBgDark : mobileBgLight}
          className="header-bg-mobile"
          alt="TODO"
        />
        <img
          src={theme === "dark" ? desktopBgDark : desktopBgLight}
          className="header-bg-desktop"
          alt="TODO"
        />
      </div>
      <div className="title-container">
        <div className="title">
          <h1>TODO</h1>
          <button onClick={handleToggleTheme}>
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
