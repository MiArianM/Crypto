import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faBtc, faEthereum } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";
import {
  faDollarSign,
  faEuroSign,
  faYenSign,
  faRubleSign,
} from "@fortawesome/free-solid-svg-icons";
const SelectOption = ({ setCurrencies }) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { value: "btc", label: "Bitcoin", icon: faBtc, color: "#000" },
    {
      value: "eth",
      label: "Etherium",
      icon: faEthereum,
      color: "#ea4c89",
    },
    {
      value: "usd",
      label: "Usd",
      icon: faDollarSign,
      color: "#0057ff",
    },
    {
      value: "eur",
      label: "Euro",
      icon: faEuroSign,
      color: "#32c766",
    },
    {
      value: "jpy",
      label: "Jpy",
      icon: faYenSign,
      color: "#f48024",
    },
    {
      value: "rub",
      label: "Ruble",
      icon: faRubleSign,
      color: "#006400",
    },
  ];
  const handleOptionClick = (option) => {
    console.log(option);
    setSelectedOption(option);
    setCurrencies(option.value);
    setIsOpen(false);
  };

  return (
    <div id="app-cover">
      <div id="select-box">
        <input
          type="checkbox"
          id="options-view-button"
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)}
        />
        <div id="select-button" className="brd">
          <div id="selected-value">
            <span>
              {selectedOption
                ? selectedOption.label
                : t("Select a Currencie(USD)")}
            </span>
          </div>
          <div id="chevrons">
            <FontAwesomeIcon icon={faChevronUp} />
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
        {isOpen && (
          <div id="options">
            {options.map((option) => (
              <div
                className="option"
                key={option.value}
                onClick={() => handleOptionClick(option)}
              >
                <input
                  className="s-c top"
                  type="radio"
                  name="platform"
                  value={option.value}
                />
                <input
                  className="s-c bottom"
                  type="radio"
                  name="platform"
                  value={option.value}
                />
                <FontAwesomeIcon
                  icon={option.icon}
                  style={{ color: option.color }}
                />
                <span className="label">{option.label}</span>
                <span className="opt-val">{option.label}</span>
              </div>
            ))}
            <div id="option-bg"></div>
          </div>
        )}
      </div>
    </div>
  );
};

SelectOption.propTypes = {
  setCurrencies: PropTypes.func,
};
export default SelectOption;
