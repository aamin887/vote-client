import { createContext } from "react";

export const ThemeContext = createContext();

function ThemeProvider({ children }) {
  return <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
