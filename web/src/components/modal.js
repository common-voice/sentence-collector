import React, { useState } from 'react';

import '../../css/modal.css';

export default function Modal({ text, children }) {
  const [modalIsOpen, setModalShown] = useState(false);
  const showModal = () => { setModalShown(true); };
  const hideModal = () => { setModalShown(false); };

  return (
    <span>
      <button className="inverse" onClick={showModal}>{text}</button>
      <div className={modalIsOpen ? "overlay" : "no-show"} onClick={hideModal}>
        <div className="modal-box">
          <button className="close-modal">
            x
          </button>
          <div>
            {children}
          </div>
        </div>
      </div>
    </span>
  );
}
