/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

const initialState = {
  opened: false,
  ip: null,
  location: null,
  language: "en",
  flagUrl: null,
  manualCountry: "",
  extrasidebar: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_MENU":
      return { ...state, opened: !state.opened };
    case "SET_IP":
      return { ...state, ip: action.payload };
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    case "SET_FLAG_URL":
      return { ...state, flagUrl: action.payload };
    case "SET_MANUAL_COUNTRY":
      return { ...state, manualCountry: action.payload };
    case "SET_EXTRA_SIDEBAR":
      return { ...state, extrasidebar: action.payload };
    default:
      return state;
  }
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
