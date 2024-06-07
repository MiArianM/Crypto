import { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { slides } from "./slides";
import { FaPause, FaPlay } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function WebFooter() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  const togglePause = () => {
    setIsPaused((prevState) => !prevState);
  };
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(nextSlide, 3500);
      return () => clearInterval(timer);
    }
  }, [isPaused]);
  return (
    <footer>
      <div className="container">
        <section className="AboutMe">
          <img
            src="./src/Assest/Images/Me.png"
            alt=""
            className="AboutMe__Image"
          />
          <div className="slider-container">
            <TransitionGroup className="slider">
              <CSSTransition
                key={currentIndex}
                timeout={500}
                classNames="slide"
              >
                <div className="slide">
                  <h2 className="slide-title">
                    {t(slides[currentIndex].title)}
                  </h2>
                  <p className="slide-description">
                    {t(slides[currentIndex].description)}
                  </p>
                </div>
              </CSSTransition>
            </TransitionGroup>
            <div className="slider-buttons">
              <button onClick={prevSlide} className="slider-button">
                {t("Back")}
              </button>
              <button onClick={nextSlide} className="slider-button">
                {t("Next")}
              </button>
            </div>
            <div className="slider-dots">
              {slides.map((_, index) => (
                <span
                  key={index}
                  className={`slider-dot ${
                    index === currentIndex ? "active" : ""
                  }`}
                  onClick={() => goToSlide(index)}
                ></span>
              ))}
            </div>
            <div className="slider-pause">
              <button onClick={togglePause} className="pause-button">
                <div className="icon-wrapper">
                  <CSSTransition in={!isPaused} timeout={500} classNames="icon">
                    <FaPause key="pause" />
                  </CSSTransition>
                  <CSSTransition in={isPaused} timeout={500} classNames="icon">
                    <FaPlay key="play" />
                  </CSSTransition>
                </div>
              </button>
            </div>
          </div>
        </section>
      </div>
      <section className="FooterBar">
        <div className="FooterContainer">
          <div className="pt-20 sm:pt-30 pb-8 mt-20 border-secondary-dark">
            <hr className="hr-main" />
            <div className="mt-2 flex-center">
              <div className="my-4 grid-main">
                <div>
                  <h2 className="font-header">{t("I am")}</h2>
                  <ul className="font-medium tracking-tight text-slate-200">
                    <span className="my-2 font-medium tracking-tight text-xl link">
                      {t("Arian Pourhossein")}
                    </span>
                    <br />
                    <span className="my-2 font-medium tracking-tight text-xl link">
                      {t("22 Y/O | he/him")}
                    </span>
                  </ul>
                </div>

                <div>
                  <h2 className="font-header">{t("Contact Me")}</h2>
                  <ul className="font-medium tracking-tight text-slate-200">
                    <li className="my-2">
                      <a
                        href="mailto:Cod16Duty@gmail.com"
                        target="_blank"
                        className="link"
                      >
                        {t("Email")}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="inline-flex-center">
                <hr className="hr-center" />
                <div className="hr-svg-wrapper">
                  <svg
                    className="svg-icon"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 14"
                  >
                    <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                  </svg>
                </div>
              </div>

              <div className="my-4 grid-cols-3">
                <ul className="font-medium tracking-tight text-slate-200">
                  <li className="my-2">
                    <a
                      href="https://github.com/MiArianM?tab=repositories"
                      className="link"
                    >
                      {t("Projects")}
                    </a>
                  </li>
                </ul>

                <ul className="font-medium tracking-tight text-slate-200">
                  <li className="my-2">
                    <a
                      href="https://github.com/MiArianM"
                      rel="me"
                      target="_blank"
                      className="link"
                    >
                      {t("GitHub")}
                    </a>
                  </li>
                </ul>

                <ul className="font-medium tracking-tight text-slate-200">
                  <li className="my-2">
                    <a
                      href="https://instagram.com/arianprh"
                      rel="me"
                      target="_blank"
                      className="link"
                    >
                      {t("Instagram")}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <hr className="hr-main" />
          </div>
        </div>
      </section>
    </footer>
  );
}

export default WebFooter;
