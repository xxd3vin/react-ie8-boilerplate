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
import DatePicker from '../components/DatePicker'; //from 'react-bootstrap-date-picker';

import * as ZuoyerenActions from '../actions/zuoyeren';

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

class ZuoYeRenPage extends Component {
  static PropTypes = {
    dispatch: PropTypes.func.isRequired
  }

  state = {
    jiaoyileixingDingwei: '',
    danjubianhao: '',
    jine: '',
    danjuriqi_from: '',
    danjuriqi_to: '',
    showJiaoyileixingWindow: false
  };
  
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchConfigData();
  }

  //
  // 表单
  //
  
  getValidationState(id) {
    const length = this.state[id].length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  handleChange(id, e) {
    this.setState({ [id]: e.target.value });
  }
  
  // 交易类型
  jiaoyileixingOnFocus() {
    this.openCaiwuzuzhiWindow();
  }
  
  // 财务组织
  caiwuzuzhiOnFocus() {
    this.openCaiwuzuzhiWindow();
  }
  
  //
  // 财务组织对话框
  //
  
  handleBeforeWindowTransitionIn(htmlElement) {
    // set class for caiwuzuzhi window parent div tag
    htmlElement.parentElement.parentElement.className += 'tw-bs';
  }
  
  closeJiaoyileixingWindow() {
    this.setState({ showJiaoyileixingWindow: false });
  }

  openCaiwuzuzhiWindow() {
    // Force input to loose focus when window opened.
    ReactDOM.findDOMNode(this.refs.jiaoyileixing).blur();
    this.setState({ showJiaoyileixingWindow: true });
  }
  
  // 查询按钮
  
  handleChaxunButtonClick() {
    window.queryExpenseBillByLike();
  }
  
  onCheck(checkedKeys, e) {
    /*this.setState({
      checkedKeys,
    });*/
    this.props.changeCheckedKeys(checkedKeys);
    this.props.changeCheckedItems(
      e.checkedNodes.map(node => ({key: node.key, title: node.props.title}))
    )
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
    
    const jiaoyileixing = (
      <FormGroup
        controlId="jiaoyileixing"
      >
        <ControlLabel style={labelStyle}>交易类型</ControlLabel>
        <input
          type="text"
          ref='jiaoyileixing'
          style={inputStyle}
          value={checkedItems.map(item => item.title).join(',')}
          onFocus={::this.jiaoyileixingOnFocus}
        />
        <FormControl.Feedback />
      </FormGroup>
    );
    
    const jine = (
      <FormGroup
        controlId="jine"
        validationState={this.getValidationState('jine')}
      >
        <ControlLabel style={labelStyle}>金额</ControlLabel>
        <input
          type="text"
          style={inputStyle}
          value={this.state.jine}
          placeholder=""
          onChange={this.handleChange.bind(this, 'jine')}
        />
        <FormControl.Feedback />
      </FormGroup>
    );
    
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
        <FormControl.Feedback />
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
        <FormControl.Feedback />
      </FormGroup>
    );
    
    // 单据日期
    
    const datePickerStyle = {
      width: '150px'
    }
    const dateFormat = 'YYYY-MM-DD';
    const dayLabels = ['日', '一', '二', '三', '四', '五', '六'];
    const monthLabels = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    const datePickerPlaceholder = '年-月-日';
    
    const danjuriqi = (
      <FormGroup>
        <FormGroup
          controlId="danjuriqi_from"
          validationState={this.getValidationState('danjuriqi_from')}
        >
          <ControlLabel style={labelStyle}>单据日期</ControlLabel>
          <DatePicker
            style={datePickerStyle}
            value={this.state.danjuriqi_from}
            dateFormat={dateFormat}
            dayLabels={dayLabels}
            monthLabels={monthLabels}
            placeholder={datePickerPlaceholder}
            onChange={this.handleChange.bind(this, 'danjuriqi_from')}
          />
        </FormGroup>
        <FormGroup
          controlId="danjuriqi_to"
          validationState={this.getValidationState('danjuriqi_to')}
        >
          <ControlLabel style={labelStyle}>-</ControlLabel>
          <DatePicker
            style={datePickerStyle}
            value={this.state.danjuriqi_to}
            dateFormat={dateFormat}
            dayLabels={dayLabels}
            monthLabels={monthLabels}
            placeholder={datePickerPlaceholder}
            onChange={this.handleChange.bind(this, 'danjuriqi_to')}
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
    
    // 财务组织窗口
    
    /**
     * @param {Object} node - Sample data:
     * ```json
     * const node = {
     *   id: '0',
     *   name: '(only one) root node',
     *   children: {
     *     0: {
     *       id: '0-0',
     *       name: 'node 0-0'
     *     },
     *     1: {
     *       id: '0-1',
     *       name: 'node 0-1',
     *       children: {
     *         0: {
     *           id: '0-1-0',
     *           name: 'node 0-1-0'
     *         }
     *       }
     *     },
     *     2: {
     *       id: '0-2',
     *       name: 'node 0-2'
     *     }
     *   }
     * }
     * ```
     * Note: the type of `children` prop is `Object`, not `Array`.
     */
    const nodeVisitor = node => {
      //console.log(`node id is ${node.id}, node name is ${node.name}`);
      return (
        <TreeNode title={node.name} key={node.id} isLeaf={node.children?false:true}>
          { node.children ? Object.keys(node.children).map(key => nodeVisitor(node.children[key])) : null }
        </TreeNode>
      )
    }

    const renderTree = (treeRootNode) => {
      if (treeRootNode) {
        return (
          <Tree defaultExpandAll={true} checkable={true} defaultExpandedKeys={['0']}
            onCheck={::this.onCheck} checkedKeys={checkedItems.map(item => item.key)}
          >
            {nodeVisitor(treeRootNode)}
          </Tree>
        )
      }
    }
    
    const jiaoyileixingWindow = (
      <Modal
        ref='jiaoyileixingWindow'
        show={this.state.showJiaoyileixingWindow}
        onEnter={::this.handleBeforeWindowTransitionIn}
        onHide={::this.closeJiaoyileixingWindow}
      >
        <Modal.Header>
          <Modal.Title>交易类型</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup
            controlId="jiaoyileixingDingwei"
          >
            <ControlLabel>定位</ControlLabel>
            <InputGroup>
              <FormControl
                type="text"
                value={checkedItems.map(item => item.title).join(',')}
              />
              <FormControl.Feedback />
              <InputGroup.Addon>
                <Glyphicon glyph="search" />
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
          <hr />
          {renderTree(node.root)}
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={::this.closeJiaoyileixingWindow}>确定</Button>
          <Button onClick={::this.closeJiaoyileixingWindow}>取消</Button>
        </Modal.Footer>
      </Modal>
    );
    
    return (
      <Form className='bao-zhang-ren' inline>
        <Grid>
          <Row>
            <Col md={12}>
              { jine }
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              { jiaoyileixing }
            </Col>
          </Row>
        </Grid>
        { jiaoyileixingWindow }
      </Form>
    );
  }
};

function mapStateToProps(state) {
  return {
    node: state.zuoyeren.node,
    checkedItems: state.zuoyeren.checkedItems
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ZuoyerenActions, dispatch);
}

// The component will subscribe to Redux store updates.
export default connect(mapStateToProps, mapDispatchToProps)(ZuoYeRenPage);