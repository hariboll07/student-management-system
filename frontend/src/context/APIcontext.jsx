import { createContext } from "react";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {

  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <ApiContext.Provider value={{ API_URL }}>
      {children}
    </ApiContext.Provider>
  );
};