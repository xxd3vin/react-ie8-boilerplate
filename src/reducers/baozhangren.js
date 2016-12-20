import update from 'react-addons-update';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as ActionTypes from '../actions/baozhangren';

const initState = {
  loaded: false,
  node: {},
  checkedKeys: [],
  checkedItems: [],
  adminAlert: {
    show: false,
    error: {
      code: 0,
      bsStyle: 'danger',
      message: ''
    }
  }
};

// Show case for redux-actions
export default handleActions({

  // Fetch data, fill in the tree view
  [ActionTypes.BAOZHANGREN_CAIWUZUZHI_TREE_REQUEST]: (state, action) => ({...state,
    treeLoading: true
  }),
  [ActionTypes.BAOZHANGREN_CAIWUZUZHI_TREE_SUCCESS]: (state, action) => ({...state,
    treeLoading: false,
    treeLoaded: true,
    node: {...action.payload}
  }),
  [ActionTypes.BAOZHANGREN_CAIWUZUZHI_TREE_FAILURE]: (state, action) => ({...state,
    treeLoading: false,
    treeLoaded: false,
    adminAlert: {...state.adminAlert,
      show: true,
      bsStyle: action.payload.bsStyle,
      message: action.payload.message
    }
  }),
  
  [ActionTypes.BAOZHANGREN_CAIWUZUZHI_TREE_CHECKED_KEYS_CHANGED]: (state, action) => ({...state,
    checkedKeys: [...action.payload]
  }),
  
  [ActionTypes.BAOZHANGREN_CAIWUZUZHI_TREE_CHECKED_ITEMS_CHANGED]: (state, action) => ({...state,
    checkedItems: [...action.payload]
  })

}, initState);