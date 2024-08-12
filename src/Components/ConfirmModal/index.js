import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

function ConfirmModal({ isOpen, onRequestClose, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Parabéns!</h2>
      <p>Você ganhou o jogo!</p>
      <button onClick={onConfirm}>Ok</button>
      <button onClick={onRequestClose}>Cancelar</button>
    </Modal>
  );
}

export default ConfirmModal;