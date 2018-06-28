import * as actionTypes from '../constants/DataConstants';
import _cloneDeep from 'lodash/cloneDeep';
import _max from 'lodash/max';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _forIn from 'lodash/forIn';
import axios from 'axios';
const host = 'http://localhost:3001';
// axios.defaults.baseURL = host;

const arrayToObject = (array) => {
  var obj = {};
  array.forEach((item, key) => {
    obj[item.id] = _cloneDeep(item);
  });
  return obj;
}

const objectToArray = (obj) => {
  var arr = [];

  _forIn(obj, (item) => {
    arr.push(_cloneDeep(item))
  })
  return arr;
}

export function getAll(model) {
  return (dispatch) => {
    const route = _get(model, 'api.route');
    return new Promise((resolve, reject) => {
      axios.get(`/${route}`, {
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

export function getOne(model, modelDataId) {
  return (dispatch, getState) => {
    const route = _get(model, 'api.route');
    const state = getState();
    const data = state.dataReducer[model.id] && _cloneDeep(state.dataReducer[model.id]) || [];
    const dataObj = arrayToObject(data);
    return new Promise((resolve, reject) => {
      axios.get(`/${route}/${modelDataId}`, {
        baseURL: host
      })
      .then(res => {
        dataObj[modelDataId] = res.data;
        dispatch({
          type: actionTypes.GET_ONE,
          [model.id]: objectToArray(dataObj)
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
    const route = _get(model, 'api.route');

    return new Promise((resolve, reject) => {
      axios.post(`${host}/${route}`, {
        data: form
      })
      .then(res => {
        dispatch({
          type: actionTypes.CREATE,
          [model.id]: data
        });
        resolve(res.data);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      })
    });
  };
};

export function update(model, form, modelDataId) {
  return (dispatch, getState) => {
    const state = getState();
    const data = state.dataReducer[model.id] && _cloneDeep(state.dataReducer[model.id]) || [];
    data.push(form);
    const route = _get(model, 'api.route');

    return new Promise((resolve, reject) => {
      axios.put(`${host}/${route}/${modelDataId}`, {
        data: form
      })
      .then(res => {
        dispatch({
          type: actionTypes.UPDATE,
          [model.id]: data
        });
        resolve(res.data);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      })
    });
  };
};

export function remove(model, id) {
  return (dispatch, getState) => {
    const route = _get(model, 'api.route');
    const state = getState();
    const data = state.dataReducer[model.id] && _cloneDeep(state.dataReducer[model.id]) || [];
    const dataObj = arrayToObject(data);
    delete dataObj[id];

    return new Promise((resolve, reject) => {
      axios.delete(`${host}/${route}/${id}`, {
      })
      .then(res => {
        dispatch({
          type: actionTypes.DELETE,
          [model.id]: objectToArray(dataObj)
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

export function upload(model, uploadUrl, file, field) {
  return (dispatch, getState) => {
    const formData = new FormData();
    formData.append(field, file);

    return new Promise((resolve, reject) => {
      axios.post(`${host}${uploadUrl}`, formData, {
      })
      .then(res => {
        dispatch({
          type: actionTypes.UPLOAD,
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
