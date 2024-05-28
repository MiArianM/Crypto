// NavBar.js
import { useContext } from "react";
import { AppContext } from "./Context";
import { useTranslation } from "react-i18next";
import MenuLinks from "./MenuLinks";
import LanguageSelector from "./LanguageSelector";
import GeoInfo from "./GEOInfo";

const NavBar = () => {
  const { state, dispatch } = useContext(AppContext);
  const { t } = useTranslation();
  const toggleMenu = () => {
    dispatch({ type: "TOGGLE_MENU" });
  };

  const activateSidebar = () => {
    dispatch({ type: "SET_EXTRA_SIDEBAR", payload: true });
  };

  const deactivateSidebar = () => {
    dispatch({ type: "SET_EXTRA_SIDEBAR", payload: false });
  };

  return (
    <nav className="Menu">
      <div onMouseLeave={deactivateSidebar} className="ExtraInfos">
        <h4 className="sidebarButton" onMouseEnter={activateSidebar}>
          ➲
        </h4>
        <div
          className={`ExtraInfos__Links ${
            state.extrasidebar && "ExtraInfos__Links--Activated"
          }`}
        >
          <a href="" className="Menu__Link Menu__Link--smaller">
            {t("Login")}
          </a>
          <a
            href=""
            className="Menu__Link Menu__Link--Border Menu__Link--smaller"
          >
            {t("Sign Up")}
          </a>
        </div>
      </div>
      <div className="Menu__wrapper">
        <a href="https://github.com/MiArianM" className="Logo" target="_blank">
          <img
            src="./src/Assest/Logo.png"
            alt="Mim Crypto Web"
            className="Logo__Img"
          />
        </a>
        <GeoInfo />
        <div className="Menu__Desktop">
          <MenuLinks />
          <LanguageSelector />
        </div>
      </div>
      <div className={`Menu__Mobile ${state.opened && "Menu__Mobile--Opened"}`}>
        <LanguageSelector isMobile />
        <MenuLinks isMobile />
        <div className="MobileMenu__Links">
          <a href="" className="MobileMenu__Link">
            {t("Login")}
          </a>
          <a href="" className="MobileMenu__Link MobileMenu__Link--Border">
            {t("Sign Up")}
          </a>
        </div>
      </div>
      <div
        className={`Menu__MobileHamburger ${
          state.opened && "Menu__MobileHamburger--Opened"
        }`}
        onClick={toggleMenu}
      >
        <span className="hamburgerLine"></span>
      </div>
    </nav>
  );
};

export default NavBar;
