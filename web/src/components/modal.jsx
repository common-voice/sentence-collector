import React from 'react';

import '../../css/modal.css'

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      modalIsOpen: false
    })
  }

  handleModalIsOpen() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    }
    )
  }
  render() {
    const handleModal = this.handleModalIsOpen.bind(this);
    return (
      <div>
        <button className="info-button" onClick={handleModal}>{this.props.text}</button>
        <div className={this.state.modalIsOpen ? "overlay" : "no-show"} onClick={handleModal}>
          <div className={this.state.modalIsOpen ? "modal-box" : "no-show"}>
            <button className="close-modal" onClick={handleModal}>
              x
            </button>
            <div>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;