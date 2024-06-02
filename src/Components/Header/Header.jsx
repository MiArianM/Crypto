import { useContext, useEffect, useReducer } from "react";
import NavBar from "./NavBar";
import HomeDescription from "./HomeDescription";
import { AppContext } from "./Context";
import axios from "axios";
import { useLoading } from "../Loading/LoadingContext";

const initialstate = { Task1: false, Task2: false, Task3: false };
const reducer = (Loadstate, action) => {
  switch (action) {
    case "Task1":
      return { ...Loadstate, Task1: true };
    case "Task2":
      return { ...Loadstate, Task2: true };
    case "Task3":
      return { ...Loadstate, Task3: true };
    default:
      return Loadstate;
  }
};

const Header = () => {
  // eslint-disable-next-line no-unused-vars
  const [Loadstate, Loaddispatch] = useReducer(reducer, initialstate);
  const { state, dispatch } = useContext(AppContext);
  function isFarsi(str) {
    const farsiRegex = /[\u0600-\u06FF]/;
    return farsiRegex.test(str);
  }
  const { dispatch: loadingDispatch } = useLoading();

  useEffect(() => {
    const fetchIp = async () => {
      loadingDispatch({ type: "START_LOADING", task: "Task1" });
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        dispatch({ type: "SET_IP", payload: response.data.ip });
        dispatch({ type: "SET_LANGUAGE", payload: "EN" });
        Loaddispatch("Task1");
      } catch (error) {
        console.error("Error fetching the IP address:", error);
      } finally {
        loadingDispatch({ type: "STOP_LOADING", task: "Task1" });
      }
    };
    fetchIp();
  }, [dispatch, loadingDispatch]);

  useEffect(() => {
    const fetchLocation = async () => {
      loadingDispatch({ type: "START_LOADING", task: "Task2" });
      try {
        if (state.ip) {
          const response = await axios.get(
            `https://ipinfo.io/${state.ip}/geo?token=9546848929e71a`
          );
          dispatch({ type: "SET_LOCATION", payload: response.data });
          Loaddispatch("Task2");
        }
      } catch (error) {
        console.error("Error fetching the geolocation:", error);
      } finally {
        loadingDispatch({ type: "STOP_LOADING", task: "Task2" });
      }
    };
    fetchLocation();
  }, [state.ip, dispatch, loadingDispatch]);

  useEffect(() => {
    const fetchFlag = async () => {
      loadingDispatch({ type: "START_LOADING", task: "Task3" });
      const countryCode = state.location
        ? state.location.country
        : state.manualCountry;
      try {
        if (countryCode && !isFarsi(countryCode)) {
          const response = await axios.get(
            `https://restcountries.com/v3.1/alpha/${countryCode}`
          );
          dispatch({
            type: "SET_FLAG_URL",
            payload: response.data[0].flags.svg,
          });
          console.log("Country Detected !");
        } else {
          dispatch({
            type: "SET_FLAG_URL",
            payload: "./src/Assest/Images/MahFlag.png",
          });
        }
        Loaddispatch("Task3");
      } catch (error) {
        console.error("Error fetching the country flag:", error);
      } finally {
        loadingDispatch({ type: "STOP_LOADING", task: "Task3" });
      }
    };
    fetchFlag();
  }, [state.location, state.manualCountry, dispatch, loadingDispatch]);

  return (
    <header>
      <div className="container">
        <NavBar />
        <HomeDescription />
      </div>
    </header>
  );
};
export default Header;
