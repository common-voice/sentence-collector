import React from 'react';

import '../../css/modal.css'

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      modalIsOpen: false,
    });
  }

  handleModalIsOpen() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  }
  render() {
    const handleModal = this.handleModalIsOpen.bind(this);
    return (
      <span>
        <button className="inverse" onClick={handleModal}>{this.props.text}</button>
        <div className={this.state.modalIsOpen ? "overlay" : "no-show"} onClick={handleModal}>
          <div className="modal-box">
            <button className="close-modal">
              x
            </button>
            <div>
              {this.props.children}
            </div>
          </div>
        </div>
      </span>
    )
  }
}

export default Modal;
