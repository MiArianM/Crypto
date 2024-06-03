import { useReducer, createContext } from "react";
import PropTypes from "prop-types";
import { loadingReducer, initialState } from "./loadingReducer";
export const LoadingContext = createContext(initialState);

export const LoadingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loadingReducer, initialState);
  return (
    <LoadingContext.Provider value={{ state, dispatch }}>
      {children}
    </LoadingContext.Provider>
  );
};

LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
