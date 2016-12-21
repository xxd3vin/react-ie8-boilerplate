import React, { Component, PropTypes } from 'react';
import { Button, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class PortalForm extends Component {
  static propTypes = {
    //editFormDefaultData: PropTypes.array.isRequired,
    //onBlur: PropTypes.func.isRequired,
    //onSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  getValidationState() {
    //return 'error';
    //return 'warning';
    return 'success';
  }

  // Performance issue?
  // http://stackoverflow.com/questions/33266156/react-redux-input-onchange-is-very-slow-when-typing-in-when-the-input-have-a
  handleBlur(label, event) {
    this.props.onBlur(label, event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit();
  }

  handleReset() {
  }

  render() {
    const { editFormDefaultData } = this.props;

    const FieldGroup = ({ key, id, label, help, ...props }) => {
      return (
        <FormGroup key={key} controlId={id}>
          <ControlLabel>{label}</ControlLabel>
          <FormControl {...props} />
          {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
      );
    }

    return (
      <Form inline>
        {this.props.children}
      </Form>
    );
  }
};

export default PortalForm;
