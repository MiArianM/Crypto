import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import IranCities from "../GetIP/IranCities.json";
import { AppContext } from "./Context";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-scroll";
const MenuLinks = ({ isMobile }) => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(AppContext);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (state.ip) {
      setIsVisible(false);
    }
  }, [state.ip]);

  const HoverMenuItem = (e) => {
    e.target.classList.add("HoveredMenuItem");
  };

  const UnHoverMenuItem = (e) => {
    e.target.classList.remove("HoveredMenuItem");
  };

  const handleManualCountryChange = (e) => {
    dispatch({ type: "SET_MANUAL_COUNTRY", payload: e.target.value });
    dispatch({ type: "SET_LOCATION", payload: { country: e.target.value } });
    setIsVisible(false);
  };

  const links = [
    { text: t("Home"), href: "Home" },
    { text: t("Products"), href: "Products" },
    { text: t("Prices"), href: "Prices" },
    { text: t("Company"), href: "Company" },
    { text: t("About"), href: "About" },
  ];

  return (
    <>
      <ul className={isMobile ? "MobileMenuList" : "DesktopMenuList"}>
        {links.map((link, index) => (
          <li
            className={isMobile ? "MobileMenu__item" : "DesktopMenu__item"}
            key={index}
          >
            <Link to={link.href} smooth={true} duration={1500}>
              <a
                onMouseEnter={HoverMenuItem}
                onMouseLeave={UnHoverMenuItem}
                href={link.href}
                className="menuitem__link"
              >
                {link.text}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      {isVisible && !state.ip && (
        <div className="GeoInfo">
          <select
            className="manual-country"
            value={state.manualCountry}
            onChange={handleManualCountryChange}
          >
            <option value={""} disabled>
              شما در ایران زندگی می کنید
            </option>
            {IranCities.map((city) => (
              <option value={`${city.slug}, ایران`} key={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

MenuLinks.propTypes = {
  isMobile: PropTypes.bool,
};

export default MenuLinks;
