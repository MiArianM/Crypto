import { useContext, useEffect } from "react";
import NavBar from "./NavBar";
import HomeDescription from "./HomeDescription";
import { AppContext } from "./Context";
import axios from "axios";

const Header = () => {
  const { state, dispatch } = useContext(AppContext);
  function isFarsi(str) {
    const farsiRegex = /[\u0600-\u06FF]/;
    return farsiRegex.test(str);
  }
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        dispatch({ type: "SET_IP", payload: response.data.ip });
        dispatch({ type: "SET_LANGUAGE", payload: "EN" });
      } catch (error) {
        console.error("Error fetching the IP address:", error);
      }
    };

    fetchIp();
  }, [dispatch]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (state.ip) {
          const response = await axios.get(`https://ipinfo.io/${state.ip}/geo`);
          dispatch({ type: "SET_LOCATION", payload: response.data });
        }
      } catch (error) {
        console.error("Error fetching the geolocation:", error);
      }
    };

    fetchLocation();
  }, [state.ip, dispatch]);

  useEffect(() => {
    const fetchFlag = async () => {
      const countryCode = state.location
        ? state.location.country
        : state.manualCountry;
      try {
        if (!isFarsi(countryCode)) {
          const response = await axios.get(
            `https://restcountries.com/v3.1/alpha/${countryCode}`
          );
          dispatch({
            type: "SET_FLAG_URL",
            payload: response.data[0].flags.svg,
          });
        } else {
          console.log(countryCode);
          dispatch({
            type: "SET_FLAG_URL",
            payload: "./src/Assest/Images/MahFlag.png",
          });
        }
      } catch (error) {
        console.error("Error fetching the country flag:", error);
      }
    };

    fetchFlag();
  }, [state.location, state.manualCountry, dispatch]);

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
