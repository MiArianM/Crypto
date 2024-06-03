import { useEffect, useState } from "react";
import { SearchedCryptos } from "../Services/CryptoApi";
import { FallingLines } from "react-loader-spinner";
import { useTranslation } from "react-i18next";
function SearchCrypto() {
  const [value, setValue] = useState("");
  const [Searched, setSearched] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [OpenList, setOpenList] = useState(false);
  const { t } = useTranslation();
  const SearchHandler = (event) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    const Searching = async () => {
      if (!value || value.length < 3) {
        setOpenList(false);
        return;
      }
      if (value.length >= 3) {
        setOpenList(true);
        setIsLoading(true);
        const res = await fetch(SearchedCryptos(value));
        const json = await res.json();
        setSearched(json.coins);
        setIsLoading(false);
      }
    };
    Searching();
  }, [value]);
  return (
    <div className="CryptoSearch">
      <input
        className="CryptoSearch__Search"
        placeholder={t("Write Crypto . . ")}
        type="text"
        value={value}
        onChange={SearchHandler}
      />
      <ul className={OpenList ? "CryptoSearch__List" : "Display--None"}>
        {!isLoading ? (
          Searched.map((item) => (
            <li className="Cryptoitem" key={item.id}>
              <img src={item.thumb} alt={item.id} />
              <h2>{item.name}</h2>
            </li>
          ))
        ) : (
          <FallingLines
            color="#4fa94d"
            width="130"
            visible={OpenList ? true : false}
            ariaLabel="falling-circles-loading"
          />
        )}
      </ul>
    </div>
  );
}

export default SearchCrypto;
