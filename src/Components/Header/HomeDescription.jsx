import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { TypeAnimation } from "react-type-animation";
import { AppContext } from "./Context";
import SequenceEN from "../SequenceEN.json";
import SequenceFA from "../SequenceFA.json";
import SequenceDE from "../SequenceDE.json";
const HomeDescription = () => {
  const { state } = useContext(AppContext);
  const { t } = useTranslation();

  const getSequence = () => {
    switch (state.language) {
      case "en":
        return SequenceEN;
      case "de":
        return SequenceDE;
      case "fa":
        return SequenceFA;
      default:
        return SequenceEN;
    }
  };

  return (
    <div className="HomeDescription">
      <h2 className="HomeDescription__Title">
        {t("Trade on the go | Anywhere, anytime.")}
      </h2>
      <p className="HomeDescription__Description">
        {t("Your crypto journey starts here !")}
      </p>
        <TypeAnimation
          key={state.language}
          className="TypingStories1"
          sequence={getSequence()}
          speed={45}
          repeat={Infinity}
        />
      <div className="LinkANDVideo">
        <a className="HomeDescription__Link" href="">
          {t("Find Out More")}
        </a>
        <div className="HomeDescription__Video">
          <img
            className="HomeDescriptionVideo__Play"
            src="./src/Assest/Images/PlayButton.svg"
            alt="Play Button"
          />
          <span className="HomeDescription__Playtitle">{t("Play Demo")}</span>
        </div>
      </div>
    </div>
  );
};

export default HomeDescription;
