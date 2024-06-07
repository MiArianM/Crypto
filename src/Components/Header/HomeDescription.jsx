import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { TypeAnimation } from "react-type-animation";
import { AppContext } from "./Context";
import { Element } from "react-scroll";
import SequenceEN from "../SequanceTranslation/SequenceEN.json";
import SequenceFA from "../SequanceTranslation/SequenceFA.json";
import SequenceDE from "../SequanceTranslation/SequenceDE.json";
import VideoModal from "./VideoModal";
const HomeDescription = () => {
  const { state } = useContext(AppContext);
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
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
      <Element name="Home">
        <TypeAnimation
          key={state.language}
          className="TypingStories1"
          sequence={getSequence()}
          speed={45}
          repeat={Infinity}
        />
      </Element>
      <div className="LinkANDVideo">
        <a
          className="HomeDescription__Link"
          href="https://github.com/MiArianM"
          target="_blank"
        >
          {t("Find Out More")}
        </a>
        <div className="HomeDescription__Video" onClick={openModal}>
          <img
            className="HomeDescriptionVideo__Play"
            src="./public/Images/PlayButton.svg"
            alt="Play Button"
          />
          <span className="HomeDescription__Playtitle">{t("Play Demo")}</span>
        </div>
      </div>
      <VideoModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        videoUrl="https://path-to-your-video.mp4"
        description={`${t(
          "Introducing Mim, where innovation meets opportunity in the world of cryptocurrency trading. With a commitment to transparency, security, and user-centric design, Mim offers a seamless platform for both seasoned traders and newcomers alike. Our cutting-edge technology ensures swift and reliable transactions, empowering users to navigate the dynamic crypto market with confidence. At Mim, we believe in democratizing access to digital assets, fostering a community built on trust and integrity. Join us on this exciting journey as we redefine the future of crypto trading."
        )}`}
      />
    </div>
  );
};

export default HomeDescription;
