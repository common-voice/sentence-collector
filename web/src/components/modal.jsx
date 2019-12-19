import React from 'react';

import '../../css/modal.css'

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={this.props.isOpen ? "overlay" : "no-show"}>
        <div className={this.props.isOpen ? "modal-box" : "no-show"}>
          <div>
          </div>
          <div>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;