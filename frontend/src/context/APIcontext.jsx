import { createContext } from "react";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {

  const API_URL = "https://student-management-system-fras.onrender.com";

  return (
    <ApiContext.Provider value={{ API_URL }}>
      {children}
    </ApiContext.Provider>
  );
};