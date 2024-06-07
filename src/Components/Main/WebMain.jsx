import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Element } from "react-scroll";
import { CryptoData, AllCryptos } from "../Services/CryptoApi";
import Services from "../Services.json";
import ServiceModal from "./ServiceModal";
import TableCoin from "./TableCoin";
function WebMain() {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [DataOfCryptos, setDataOfCryptos] = useState([]);
  const [Cryptos, setCryptos] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [page, setPage] = useState(1);
  const [Currencies, setCurrencies] = useState("usd");
  const [selectValue, setSelectValue] = useState(10);
  const { t } = useTranslation();
  const handleMoreClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };
  useEffect(() => {
    const GetCoinData = async () => {
      setIsLoading(true);
      const res = await fetch(CryptoData(page, Currencies, selectValue));
      const json = await res.json();
      setDataOfCryptos(json);
      const resAll = await fetch(AllCryptos());
      const jsonAll = await resAll.json();
      setCryptos(jsonAll);
      setIsLoading(false);
    };
    GetCoinData();
  }, [page, Currencies, selectValue]);
  return (
    <main>
      <div className="container">
        <section className="Services">
          {Services.map((service, index) => (
            <div key={index} className="Service">
              <Element name="Products">
                <img
                  className="Service__Image"
                  src={service.img}
                  alt={service.alt}
                />
              </Element>
              <div className="Service__Infos">
                <h2 className="Service__Title">{t(service.Title)}</h2>
                <p className="Service__Description">{t(service.Description)}</p>
              </div>
              <button
                className="Service__More"
                onClick={() => handleMoreClick(service)}
              >
                {t("More")}
              </button>
            </div>
          ))}
        </section>
      </div>
      {isModalOpen && selectedService && (
        <ServiceModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          description={{
            MoreDescription: selectedService.MoreDescription,
            HoverColored: selectedService.HoverColored,
            VideoUrl: selectedService.VideoUrl,
          }}
        />
      )}
      <Element name="Prices">
        <TableCoin
          isLoading={isLoading}
          DataOfCryptos={DataOfCryptos}
          page={page}
          setPage={setPage}
          Currencies={Currencies}
          setCurrencies={setCurrencies}
          Cryptos={Cryptos}
          setSelectValue={setSelectValue}
        />
      </Element>
    </main>
  );
}

export default WebMain;
