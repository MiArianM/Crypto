import PropTypes from "prop-types";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ThreeDots } from "react-loader-spinner";
import SelectOption from "./SelectOption";
import RowPagination from "./RowPagination";
import SearchCrypto from "./SearchCrypto";
import { useTranslation } from "react-i18next";

function TableCoin({
  DataOfCryptos,
  setPage,
  page,
  isLoading,
  Currencies,
  setCurrencies,
  Cryptos,
  setSelectValue,
}) {
  console.log(DataOfCryptos);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const { t } = useTranslation();

  return (
    <>
      <div className="TableSetting">
        <div className="prANDnumber">
          <Stack spacing={2}>
            <Pagination
              page={page}
              count={Math.ceil(Cryptos.length / 15)}
              variant="outlined"
              color="secondary"
              onChange={handleChange}
            />
          </Stack>
          <SelectOption setCurrencies={setCurrencies} />
        </div>
        <div className="CurANDsearch">
          {" "}
          <RowPagination setSelectValue={setSelectValue} />
          <SearchCrypto />
        </div>
      </div>

      <table>
        <caption>{t("Coin Status")}</caption>
        <thead>
          <tr>
            <th scope="col">{t("Coin")}</th>
            <th scope="col">{t("Name")}</th>
            <th scope="col">{t("Price")}</th>
            <th scope="col">{t("At 24H")}</th>
            <th scope="col">{t("Total Volume")}</th>
            <th scope="col">{t("Chart")}</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading && DataOfCryptos ? (
            DataOfCryptos.map((coin) => (
              <TableRow Currencies={Currencies} coin={coin} key={coin.id} />
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
TableCoin.propTypes = {
  DataOfCryptos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      symbol: PropTypes.string,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      current_price: PropTypes.number,
      price_change_percentage_24h: PropTypes.number,
      total_volume: PropTypes.number,
    })
  ).isRequired,
  Cryptos: PropTypes.array,
  isLoading: PropTypes.bool,
  Currencies: PropTypes.string,
  setCurrencies: PropTypes.func,
  setSelectValue: PropTypes.func,
  setPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

export default TableCoin;

const TableRow = ({
  coin: {
    price_change_percentage_24h: price_change,
    current_price: price,
    symbol,
    name,
    image,
    id,
    total_volume,
  },
  Currencies,
}) => {
  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case "btc":
        return "";
      case "usd":
        return "$ ";
      case "eur":
        return "€ ";
      case "jpy":
        return "¥ ";
      case "rub":
        return "₽ ";
      default:
        return "";
    }
  };
  return (
    <tr>
      <td data-label="Coin">
        <div className="Coin">
          <img className="Coin__Image" src={image} alt={id} />
          <h4 className="Coin__symbol">{symbol}</h4>
        </div>
      </td>
      <td data-label="Name">{name}</td>
      <td data-label="Price">
        {price
          ? getCurrencySymbol(Currencies) + price.toLocaleString()
          : "Price is Not Defined Yet !"}
      </td>
      <td data-label="At 24H">
        {price ? price_change.toFixed(2) : "Not Found !"}
      </td>
      <td data-label="Total Volume">
        {price ? total_volume.toLocaleString() : "0"}
      </td>
      <td data-label="Chart">{price_change}</td>
    </tr>
  );
};
TableRow.propTypes = {
  coin: PropTypes.shape({
    id: PropTypes.string.isRequired,
    symbol: PropTypes.string,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    current_price: PropTypes.number,
    price_change_percentage_24h: PropTypes.number,
    total_volume: PropTypes.number,
  }).isRequired,
  Currencies: PropTypes.string,
};
