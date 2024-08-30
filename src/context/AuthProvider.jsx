import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist") || false)
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth, setPersist, persist }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
