import { useState } from "react";
import Services from "../Services.json";
import ServiceModal from "./ServiceModal";
import { useTranslation } from "react-i18next";
function WebMain() {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const handleMoreClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <main>
      <div className="container">
        <section className="Services">
          {Services.map((service, index) => (
            <div key={index} className="Service">
              <img
                className="Service__Image"
                src={service.img}
                alt={service.alt}
              />
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
    </main>
  );
}

export default WebMain;
