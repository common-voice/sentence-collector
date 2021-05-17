import React, { useState } from 'react';

import '../../css/modal.css';

type Props = {
  text?: string
  children?: React.ReactNode
}

export default function Modal({ text, children }: Props) {
  const [modalIsOpen, setModalShown] = useState(false);
  const showModal = () => { setModalShown(true); };
  const hideModal = () => { setModalShown(false); };

  return (
    <span>
      <button className="secondary" onClick={showModal}>{text}</button>
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
