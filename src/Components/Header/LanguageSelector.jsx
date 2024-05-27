import { useContext } from "react";
import { AppContext } from "./Context";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line no-unused-vars
import i18n from "../Translation/i18n";
import PropTypes from "prop-types";
const LanguageSelector = ({ isMobile }) => {
  const { state, dispatch } = useContext(AppContext);
  const { t, i18n } = useTranslation();

  const changeLanguage = (e) => {
    const language = e.target.value;
    dispatch({ type: "SET_LANGUAGE", payload: language });
    i18n.changeLanguage(language);
  };

  return (
    <select
      onChange={changeLanguage}
      className={isMobile ? "Language" : "DesktopLanguage"}
      value={state.language}
    >
      <option disabled value="">
        {t("Choose Between")}
      </option>
      <option value="en">EN</option>
      <option value="fa">FA</option>
      <option value="de">DE</option>
    </select>
  );
};
LanguageSelector.propTypes = {
  isMobile: PropTypes.bool,
};
export default LanguageSelector;
