import Modal from "react-modal";
import styled from "styled-components";
import PropTypes from "prop-types";
import VideoPlayer from "./VideoPlayer";
const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "4px solid black",
    borderRadius: "4rem",
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

const CloseButton = styled.button`
  position: absolute;
  top: -15px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 5.5rem;
  color: red;
  cursor: pointer;
`;

const VideoModal = ({ isOpen, onRequestClose, description }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalStyles}
      ariaHideApp={false}
    >
      <CloseButton onClick={onRequestClose}>&times;</CloseButton>
      <VideoPlayer />
      <div style={{ padding: "20px", backgroundColor: "white" }}>
        <p className="DemoDescription">{description}</p>
      </div>
    </Modal>
  );
};
VideoModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  videoUrl: PropTypes.string,
  description: PropTypes.string,
};
export default VideoModal;
