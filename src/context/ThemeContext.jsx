import { createContext, useEffect, useState } from "react";

const DEFAULT_THEME = "dark"
const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_THEME;
    return window.localStorage.getItem("theme") || DEFAULT_THEME;
  });

  useEffect(() => {
    document.documentElement.className = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
