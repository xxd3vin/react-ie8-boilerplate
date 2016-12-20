import { combineReducers } from 'redux';
import welcome from './welcome';
import baozhangren from './baozhangren';
import shenpiren from './shenpiren';
import zuoyeren from './zuoyeren';

const rootReducer = combineReducers({
  welcome,
  baozhangren,
  shenpiren,
  zuoyeren
});

export default rootReducer;
