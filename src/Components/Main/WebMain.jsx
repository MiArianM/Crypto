import { useState } from "react";
import Services from "../Services.json";
import PropTypes from "prop-types";
import { v4 } from "uuid";
function WebMain() {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                <h2 className="Service__Title">{service.Title}</h2>
                <p className="Service__Description">{service.Description}</p>
              </div>
              <button
                className="Service__More"
                onClick={() => handleMoreClick(service)}
              >
                More
              </button>
              {isModalOpen && selectedService && (
                <Modal
                  Data={{
                    MoreDescription: service.MoreDescription,
                    HoverColored: service.HoverColored,
                  }}
                  service={selectedService}
                  onClose={closeModal}
                />
              )}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

function Modal({ service, onClose, Data }) {
  // eslint-disable-next-line react/prop-types
  const { MoreDescription, HoverColored } = Data;
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <ul>
          {MoreDescription.map((Description) => (
            <li key={v4()}>
              <h2>{Description.ProsTitle}</h2>
              <p>{Description.Description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
Modal.propTypes = {
  service: PropTypes.bool,
  onClose: PropTypes.bool,
};
export default WebMain;
