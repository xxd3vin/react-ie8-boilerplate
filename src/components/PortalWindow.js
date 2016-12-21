import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Form, FormGroup, ControlLabel, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

import 'rc-tree/assets/index.css';
import Tree, { TreeNode } from 'rc-tree';

export default class PortalWindow extends Component {
  static defaultProps = {
    checkedItems: [],
    treeData: {},
    show: false
  }

  static PropTypes = {
    checkedItems: PropTypes.array,
    treeData: PropTypes.object,
    show: PropTypes.bool,
    onTreeCheck: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired
  }

  state = {
    showCaiwuzuzhiWindow: this.props.show
  };
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    this.state.showCaiwuzuzhiWindow = nextProps.show
  }

  //
  // 财务组织对话框
  //
  
  handleBeforeWindowTransitionIn(htmlElement) {
    // set class for caiwuzuzhi window parent div tag
    htmlElement.parentElement.parentElement.className += 'tw-bs';
  }
  
  closeCaiwuzuzhiWindow() {
    this.setState({ showCaiwuzuzhiWindow: false });
    this.props.onHide();
  }

  handleTreeCheck(checkedKeys, e) {
    this.props.onTreeCheck(
      e.checkedNodes.map(node => ({key: node.key, title: node.props.title}))
    )
  }

  render() {
    const { treeData, checkedItems } = this.props;
    
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
            onCheck={::this.handleTreeCheck} checkedKeys={checkedItems.map(item => item.key)}
          >
            {nodeVisitor(treeRootNode)}
          </Tree>
        )
      }
    }
    
    return (
      <Modal
        ref='caiwuzuzhiWindow'
        show={this.state.showCaiwuzuzhiWindow}
        onEnter={::this.handleBeforeWindowTransitionIn}
        onHide={::this.closeCaiwuzuzhiWindow}
      >
        <Modal.Header bsClass='modal-header fuck-header'>
          <Modal.Title>财务组织版本</Modal.Title>
        </Modal.Header>
        <Modal.Body bsClass='modal-body fuck-body'>
          <FormGroup
            controlId="caiwuzuzhiDingwei"
          >
            <ControlLabel>定位</ControlLabel>
            <InputGroup>
              <FormControl
                type="text"
                defaultValue={checkedItems.map(item => item.title).join(',')}
              />
              <InputGroup.Addon>
                <Glyphicon glyph="search" />
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
          <hr />
          {renderTree(treeData.root)}
        </Modal.Body>
        <Modal.Footer bsClass='modal-footer fuck-footer'>
          <Button bsStyle="primary" onClick={::this.closeCaiwuzuzhiWindow}>确定</Button>
          <Button onClick={::this.closeCaiwuzuzhiWindow}>取消</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};
