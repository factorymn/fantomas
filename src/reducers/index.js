/* eslint-disable no-multi-spaces */

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import modelReducer        from './ModelReducer';
import dataReducer        from './DataReducer';
import requestReducer        from './RequestReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  modelReducer,
  dataReducer,
  requestReducer,
  // form: formReducer,
  // filter: formReducer,
  auth: formReducer,
  router: routerReducer
});

export default rootReducer;
