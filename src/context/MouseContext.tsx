import React, { createContext, useState, ReactNode } from "react";

interface MouseContextType {
  cursorType: string;
  cursorChangeHandler: (cursorType: string) => void;
}

export const MouseContext = createContext<MouseContextType>({
  cursorType: "",
  cursorChangeHandler: (_cursorType: string) => {},
});

interface MouseContextProviderProps {
  children: ReactNode;
}

const MouseContextProvider: React.FC<MouseContextProviderProps> = (props) => {
  const [cursorType, setCursorType] = useState<string>("");

  const cursorChangeHandler = (cursorType: string) => {
    setCursorType(cursorType);
  };

  return (
    <MouseContext.Provider
      value={{
        cursorType: cursorType,
        cursorChangeHandler: cursorChangeHandler,
      }}
    >
      {props.children}
    </MouseContext.Provider>
  );
};

export default MouseContextProvider;
