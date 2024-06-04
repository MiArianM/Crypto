import ReactModal from "react-modal";
import styled from "styled-components";

ReactModal.setAppElement("#root");

const ModalStyles = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const ChartModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{ overlay: { background: "rgba(0, 0, 0, 0.5)" } }}
    >
      <ModalStyles>{children}</ModalStyles>
    </ReactModal>
  );
};

export default ChartModal;
