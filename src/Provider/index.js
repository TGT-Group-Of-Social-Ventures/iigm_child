import React, { createContext, useContext, useReducer } from 'react';

// Create a context to hold the Redux store
const ReduxContext = createContext();

// Custom provider component
export const ReduxProvider = ({ reducer, initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ReduxContext.Provider value={{ state, dispatch }}>
      {children}
    </ReduxContext.Provider>
  );
};

// Custom hook to access the Redux store
export const useRedux = () => {
  const context = useContext(ReduxContext);
  if (!context) {
    throw new Error('useRedux must be used within a ReduxProvider');
  }
  return context;
};
