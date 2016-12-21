import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import { Link } from 'react-router';

import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Form, FormGroup, ControlLabel, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

import 'rc-tree/assets/index.css';
import Tree, { TreeNode } from 'rc-tree';

import PortalForm from '../components/PortalForm';
import PortalLabel from '../components/PortalLabel';
import PortalInput from '../components/PortalInput';
import PortalDatePicker from '../components/PortalDatePicker';
import PortalWindow from '../components/PortalWindow';

import * as ShenpirenActions from '../actions/shenpiren';

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

class ShenpirenPage extends Component {
  static PropTypes = {
    dispatch: PropTypes.func.isRequired
  }

  state = {
    danjubianhao: '',
    jine_from: '',
    jine_to: '',
    danjuriqi_from: '',
    danjuriqi_to: '',
    showCaiwuzuzhiWindow: false
  };
  
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // Fix DatePicker overlay.
    if (window && window.document) {
      document.getElementById('$d_billnav_um').style.overflow = null;
      document.getElementById('$d_billnav_funhtmlcontent').style.overflow = null;
    }
  }

  componentDidMount() {
    this.props.fetchConfigData();
  }

  //
  // 表单
  //
  
  getValidationState(id) {
    return 'success';
    const length = this.state[id].length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  handleChange(id, e) {
    this.setState({ [id]: e.target.value });
  }
  
  // 财务组织
  caiwuzuzhiOnFocus() {
    this.openCaiwuzuzhiWindow();
  }
  
  //
  // 财务组织对话框
  //

  openCaiwuzuzhiWindow() {
    // Force input to loose focus when window opened.
    ReactDOM.findDOMNode(this.refs.caiwuzuzhi).blur();
    this.setState({ showCaiwuzuzhiWindow: true });
  }

  handleTreeCheck(items) {
    this.props.changeCheckedItems(items)
  }

  handleCaiwuzuzhiWindowHide() {
    this.setState({ showCaiwuzuzhiWindow: false });
  }

  // 单据日期
  handleDateChange(id, value, formattedValue) {
    this.setState({
      [id]: formattedValue
    });
  }

  // 查询按钮
  handleChaxunButtonClick() {
    //window.queryExpenseBillByLike();
    let danjubianhaoValue = this.state.danjubianhao;
    const {
      jine_from, jine_to,
      danjuriqi_from, danjuriqi_to
    } = this.state;
    const { checkedItems } = this.props;
    var proxy = new ServerProxy(null, null, true);
    proxy.addParam('clc', 'nc.bs.er.checkportlet.ctrl.MainViewController');
    proxy.addParam('el', '2');
    proxy.addParam('source_id', 'main');
    proxy.addParam('source_type', 'widget');
    proxy.addParam('widget_id', 'main');
    proxy.addParam('m_n', 'doQueryByLikeQuery');

    proxy.addParam('pk_org', checkedItems.map(item => item.key).join(','));
    proxy.addParam('likeQueryValue', danjubianhaoValue);
    proxy.addParam('amount_left', jine_from);
    proxy.addParam('amount_right', jine_to);
    proxy.addParam('date_left', danjuriqi_from);
    proxy.addParam('date_right', danjuriqi_to);

    proxy.execute();
  }
  
  render() {
    const { node, checkedItems } = this.props;
    const { dispatch } = this.props;
    
    const labelStyle = {
      float: 'left',
      lineHeight: '16px',
      marginLeft: '10px',
      //marginTop: '8px',
      paddingRight: '8px',
      color: '#028FD1',
      fontSize: '12px',
      fontWeight: 'normal'
    }
    
    const inputStyle = {
      'fontFamily': '宋体, sans-serif',
      'fontSize': '12px',
      'color': 'rgb(51, 51, 51)',
      'outline': 'none'
    }
    
    const formControlStyle = {...inputStyle
      
    }
    
    const caiwuzuzhi = (
      <FormGroup
        controlId="caiwuzuzhi"
      >
        <ControlLabel style={labelStyle}>财务组织</ControlLabel>
        <input
          type="text"
          ref='caiwuzuzhi'
          style={inputStyle}
          value={checkedItems.map(item => item.title).join(',')}
          onFocus={::this.caiwuzuzhiOnFocus}
        />
      </FormGroup>
    );
    const danjubianhao = (
      <FormGroup
        controlId="danjubianhao"
        validationState={this.getValidationState('danjubianhao')}
      >
        <ControlLabel style={labelStyle}>模糊搜索</ControlLabel>
        <input
          type="text"
          style={inputStyle}
          value={this.state.danjubianhao}
          placeholder="单据编号"
          onChange={this.handleChange.bind(this, 'danjubianhao')}
        />
        {/*<FormControl.Feedback />*/}
      </FormGroup>
    );
    const jineStyle = {...inputStyle,
      width: '50px'
    }
    const jine = (
      <FormGroup>
        <FormGroup
          controlId="jine_from"
          validationState={this.getValidationState('jine_from')}
        >
          <ControlLabel style={labelStyle}>金额</ControlLabel>
          <input
            type="text"
            style={inputStyle}
            value={this.state.jine_from}
            onChange={this.handleChange.bind(this, 'jine_from')}
            style={jineStyle}
          />
        </FormGroup>
        <FormGroup
          controlId="jine_to"
          validationState={this.getValidationState('jine_to')}
        >
          <ControlLabel style={labelStyle}>-</ControlLabel>
          <input
            type="text"
            style={inputStyle}
            value={this.state.jine_to}
            onChange={this.handleChange.bind(this, 'jine_to')}
            style={jineStyle}
          />
        </FormGroup>
      </FormGroup>
    );
    
    // 单据日期
    const danjuriqi = (
      <FormGroup>
        <FormGroup
          controlId="danjuriqi_from"
          validationState={this.getValidationState('danjuriqi_from')}
        >
          <ControlLabel style={labelStyle}>单据日期</ControlLabel>
          <PortalDatePicker
            value={this.state.danjuriqi_from}
            onChange={this.handleDateChange.bind(this, 'danjuriqi_from')}
          />
        </FormGroup>
        <FormGroup
          controlId="danjuriqi_to"
          validationState={this.getValidationState('danjuriqi_to')}
        >
          <ControlLabel style={labelStyle}>-</ControlLabel>
          <PortalDatePicker
            value={this.state.danjuriqi_to}
            onChange={this.handleDateChange.bind(this, 'danjuriqi_to')}
          />
        </FormGroup>
      </FormGroup>
    );
    
    const chaxunButton = (
      <span
        style={{color:'#028FD1',cursor:'pointer'}}
        onClick={::this.handleChaxunButtonClick}
      >查询</span>
    );

    return (
      <Form className='shenpiren' inline>
        <Grid fluid={true} style={{marginLeft: 0, paddingLeft: 0}}>
          <Row>
            <Col md={12} style={{ paddingBottom: '8px' }}>
              { caiwuzuzhi }
            </Col>
          </Row>
          <Row>
            <Col md={3} style={{width: '235px', float: 'left', paddingRight: 0}}>
              { danjubianhao }
            </Col>
            <Col md={2} style={{width: '180px', float: 'left', paddingRight: 0}}>
              { jine }
            </Col>
            <Col md={5} style={{width: '405px', float: 'left', paddingRight: 0}}>
              { danjuriqi }
            </Col>
            <Col md={2} style={{width: '100px', float: 'left', paddingRight: 0}}>
              { chaxunButton }
            </Col>
          </Row>
        </Grid>
        <PortalWindow
          show={this.state.showCaiwuzuzhiWindow}
          treeData={node}
          checkedItems={checkedItems}
          onTreeCheck={::this.handleTreeCheck}
          onHide={::this.handleCaiwuzuzhiWindowHide}
        />
      </Form>
    );
  }
};

function mapStateToProps(state) {
  return {
    node: state.shenpiren.node,
    checkedItems: state.shenpiren.checkedItems
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ShenpirenActions, dispatch);
}

// The component will subscribe to Redux store updates.
export default connect(mapStateToProps, mapDispatchToProps)(ShenpirenPage);
