import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [results, setResults] = useState([]);

  return (
    <SearchContext.Provider value={{ results, setResults }}>
      {children}
    </SearchContext.Provider>
  );
}
