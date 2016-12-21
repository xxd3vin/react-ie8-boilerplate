import React, { Component, PropTypes } from 'react';
import { ControlLabel } from 'react-bootstrap';

class PortalLabel extends Component {
  static propTypes = {
    //handleCreate: PropTypes.func.isRequired,
    //handleUpdate: PropTypes.func.isRequired,
    //handleDelete: PropTypes.func.isRequired
    //onDismiss: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
  }
  handleAlertDismiss() {
    this.props.onDismiss();
  }
  render() {
    return (
      <div className='portal-label'>
        <ControlLabel>{this.props.children}</ControlLabel>
      </div>
    )
  }
};

export default PortalLabel;
