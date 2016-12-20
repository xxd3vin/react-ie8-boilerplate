import fetch from 'isomorphic-fetch';
import { createAction } from 'redux-actions';

// Common helper -> utils.js/api.js
const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
};
const parseJSON = response => response.json();

// NC sync config: fetch data

export const ZUOYEREN_CAIWUZUZHI_TREE_REQUEST = 'ZUOYEREN_CAIWUZUZHI_TREE_REQUEST';
export const ZUOYEREN_CAIWUZUZHI_TREE_SUCCESS = 'ZUOYEREN_CAIWUZUZHI_TREE_SUCCESS';
export const ZUOYEREN_CAIWUZUZHI_TREE_FAILURE = 'ZUOYEREN_CAIWUZUZHI_TREE_FAILURE';

const configRequest = createAction(ZUOYEREN_CAIWUZUZHI_TREE_REQUEST);
const configSuccess = createAction(ZUOYEREN_CAIWUZUZHI_TREE_SUCCESS, data => data);
const configFailure = createAction(ZUOYEREN_CAIWUZUZHI_TREE_FAILURE,
  (bsStyle, message) => ({bsStyle, message})
);

export const fetchConfigData = () => {
  return (dispatch) => {
    dispatch(configRequest());
    var opts = {
      method: 'get',
      headers: {
        'Content-type': 'application/json'
      },
      mode: "cors"
    };

    //var url = '/api/caiwuzuzhi/tree';
    var url = 'http://101.200.74.182:82/caiwuzuzhi/tree.json';

    return fetch(url, opts)
      .then(response => {
        return response.json();
      }).then(json => {
        dispatch(configSuccess(json));
      }).catch(error => {
        console.log("fetch error:", error);
        dispatch(configFailure('danger', error.message));
      });
  }
}

// obsolete
export const ZUOYEREN_CAIWUZUZHI_TREE_CHECKED_KEYS_CHANGED = 'ZUOYEREN_CAIWUZUZHI_TREE_CHECKED_KEYS_CHANGED';
const checkedKeysChanged = createAction(ZUOYEREN_CAIWUZUZHI_TREE_CHECKED_KEYS_CHANGED, data => data);
export const changeCheckedKeys = checkedKeys => dispatch => dispatch(checkedKeysChanged(checkedKeys))

export const ZUOYEREN_CAIWUZUZHI_TREE_CHECKED_ITEMS_CHANGED = 'ZUOYEREN_CAIWUZUZHI_TREE_CHECKED_ITEMS_CHANGED';
const checkedItemChanged = createAction(ZUOYEREN_CAIWUZUZHI_TREE_CHECKED_ITEMS_CHANGED, data => data);
export const changeCheckedItems = checkedItem => dispatch => dispatch(checkedItemChanged(checkedItem))