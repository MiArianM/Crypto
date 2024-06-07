import { useContext } from "react";
import { AppContext } from "./Context";

const GeoInfo = () => {
  const { state } = useContext(AppContext);
  return state.location ? (
    <div className="GeoInfo">
      <span className="GeoInfo__Items">
        <img className="Nationality" src={state.flagUrl} alt="Flag" />
      </span>
    </div>
  ) : (
    <img className="Nationality" src="./public/Images/MahFlag.png" />
  );
};

export default GeoInfo;
