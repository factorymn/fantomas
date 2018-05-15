import * as actionTypes from '../constants/DataConstants';
import _cloneDeep from 'lodash/cloneDeep';
import _max from 'lodash/max';
import _get from 'lodash/get';
import _set from 'lodash/set';
import axios from 'axios';
const host = 'http://localhost:3001/';
// axios.defaults.baseURL = host;

export function getAll(model) {
  return (dispatch) => {
    const route = _get(model, 'api.route');
    return new Promise((resolve, reject) => {
      axios.get(route, {
        baseURL: host
      })
      .then(res => {
        dispatch({
          type: actionTypes.GET_ALL,
          [model.id]: res.data
        });
        resolve(res.data);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      })
    });
  };
}

export function create(model, form) {
  return (dispatch, getState) => {
    const state = getState();
    const data = state.dataReducer[model.id] && _cloneDeep(state.dataReducer[model.id]) || [];
    data.push(form);
    dispatch({
      type: actionTypes.CREATE,
      [model.id]: data
    });
  };
}
