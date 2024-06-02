import { createContext, useReducer, useContext } from "react";
import PropTypes from "prop-types";

const initialState = { isLoading: true, tasks: {} };

const LoadingContext = createContext(initialState);

const loadingReducer = (state, action) => {
  switch (action.type) {
    case "START_LOADING": {
      return {
        ...state,
        isLoading: true,
        tasks: { ...state.tasks, [action.task]: true },
      };
    }
    case "STOP_LOADING": {
      const updatedTasks = { ...state.tasks };
      delete updatedTasks[action.task];
      return {
        ...state,
        isLoading: Object.keys(updatedTasks).length > 0,
        tasks: updatedTasks,
      };
    }
    default:
      return state;
  }
};

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

export const useLoading = () => useContext(LoadingContext);
