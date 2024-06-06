import ReactModal from "react-modal";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

ReactModal.setAppElement("#root");

const StyledModal = styled(ReactModal)`
  position: fixed;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-42%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.8);
  width: 80%;
  height: 80%;
  text-align: center;
  max-width: 1800px;
  font-size: 12px;
  flex-direction: column;
`;

const CloseButton = styled.button`
  position: absolute;
  background: #ff5a5f;
  border: none;
  color: white;
  padding: 10px 10px;
  border-radius: 1%;
  cursor: pointer;
  font-size: 11px;
  top: 0;
  right: 0;

  &:hover {
    background: #ff3a3f;
  }
`;

const ChartModal = ({ isOpen, onRequestClose, children }) => {
  const { t } = useTranslation();

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
    >
      {children}
      <CloseButton onClick={onRequestClose}>{t("close")}</CloseButton>
    </StyledModal>
  );
};
ChartModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  children: PropTypes.any,
};
export default ChartModal;
