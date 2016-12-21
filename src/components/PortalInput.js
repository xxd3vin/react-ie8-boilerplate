import React, { Component, PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';

class PortalInput extends Component {
  static propTypes = {
    //handleCreate: PropTypes.func.isRequired,
    //handleUpdate: PropTypes.func.isRequired,
    placeholder: PropTypes.string
  };
  state = { value: '' };

  constructor(props) {
    super(props);
  }

  handleCreate(event) {
    event.preventDefault();
    this.props.handleCreate();
  }
  handleUpdate(event) {
    event.preventDefault();
    this.props.handleUpdate();
  }
  handleDelete(event) {
    event.preventDefault();
    this.props.handleDelete();
  }

  handleChange(e) {
    this.setState({ value: e.target.value })
  }

  render() {
    const { children } = this.props;
    return (
      <div className='portal-input'>
        <FormControl
          type="text"
          value={this.state.value}
          placeholder="Enter text"
          onChange={::this.handleChange}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
};

export default PortalInput;
