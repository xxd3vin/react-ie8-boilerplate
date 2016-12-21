import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Form, FormGroup, ControlLabel, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

import PortalDatePicker from '../components/PortalDatePicker';

import * as BaozhangrenActions from '../actions/baozhangren';

/**
 * ## UI标准术语
 *
 * - 窗口[window]: dialog, modal
 * - 表单[form]:
 *
 * ## 业务标准术语
 *
 * - 财务组织[caiwuzuzhi]:
 * - 金额[jine]:
 * - 单据编号[danjubianhao]:
 */

class PortalDatePickerPage extends Component {
  static PropTypes = {
    dispatch: PropTypes.func.isRequired
  }

  state = {
    riqi: ''
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  handleChange(value, formattedValue) {
    console.log('PortalDatePickerPage.handleChange: value =', value,
      ', formattedValue =', formattedValue);
    this.setState({
      riqi: formattedValue
    });
  }

  render() {
    return (
      <PortalDatePicker
        value={this.state.riqi}
        onChange={::this.handleChange}
      />
    );
  }
};

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(BaozhangrenActions, dispatch);
}

// The component will subscribe to Redux store updates.
export default connect(mapStateToProps, mapDispatchToProps)(PortalDatePickerPage);
