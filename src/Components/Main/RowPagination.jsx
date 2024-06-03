import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
function RowPagination({ setSelectValue }) {
  const { t } = useTranslation();

  const HandleSelecting = (event) => {
    const value = event.target.value;
    setSelectValue(value);
  };
  return (
    <div className="perRow">
      <h2 className="perRow__text">{t("Records Per Page :")}</h2>
      <select className="perRow__List" onChange={HandleSelecting} name="PerRow">
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
      </select>
    </div>
  );
}
RowPagination.propTypes = {
  setSelectValue: PropTypes.func,
};
export default RowPagination;
