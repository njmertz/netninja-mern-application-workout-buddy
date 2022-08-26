import { useModalContext } from '../hooks/useModalContext';

const Modal = () => {
  const {openModal, modalContent, dispatch} = useModalContext();

  const closeModal = (e) => {
    e.preventDefault();
    dispatch({type: "CLOSE_MODAL"})
  }

  return (
    <div className={`modal-overlay ${openModal === true ? 'modal-opened' : 'modal-closed'}`}>
      <div className="modal-container">
        <span className="material-symbols-outlined close-modal-button" onClick={closeModal}>close</span>
        {modalContent}
      </div>
    </div>
  );
};

export default Modal;