import { createContext,useState } from "react";

export const globalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [value1, setValue1] = useState("")
    return <globalContext.Provider value={{
        value1: value1,
        setVal:setValue1,
    }}>{children}</globalContext.Provider>;
};
