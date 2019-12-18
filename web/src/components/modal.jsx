import React from 'react';

import '../../css/modal.css'

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div className="overlay">
        <div className="modal-box">
          {this.props.children}
      </div>
      </div>
    )
  }
}

export default Modal;