import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import configform from './configform';
import utils from './utils';

export default combineReducers({
  alert,
  auth,
  profile,
  configform,
  utils

});
