import * as actionTypes from '../constants/ModelConstants';
import _cloneDeep from 'lodash/cloneDeep';
import _max from 'lodash/max';
import _get from 'lodash/get';
import _set from 'lodash/set';
import request from 'axios';

const recordAllModels = (models) => {
  request.post('/models', {
    models
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
};

export function add(model) {
  return (dispatch, getState) => {
    const state = getState();
    const models = _cloneDeep(state.modelReducer.models);
    let index = _max(Object.keys(models).map((index) => parseInt(index, 10))) || 0;
    index = index + 1;
    models[index] = Object.assign({}, model, { id: index });

    if (model.parentId) {
      _set(models[model.parentId], `childModels.${index}`, model.name)
      // models[model.parentId].childModels[index] = model.name;
    }

    dispatch({
      type: actionTypes.ADD,
      models
    });
    recordAllModels(models);
  };
}

export function update(model, id) {
  return (dispatch, getState) => {
    const state = getState();
    const models = _cloneDeep(state.modelReducer.models);
    models[id] = model;
    dispatch({
      type: actionTypes.UPDATE,
      models
    });
    recordAllModels(models);
  };
}

export function remove(id) {
  return (dispatch, getState) => {
    const state = getState();
    const models = _cloneDeep(state.modelReducer.models);
    const parentId = _get(models, `${id}.parentId`);
    if (parentId) {
      delete models[parentId].childModels[id];
    }
    delete models[id];
    dispatch({
      type: actionTypes.REMOVE,
      models
    });
    recordAllModels(models);
  };
}

export function getAll() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      request.get('/models')
        .then(function (response) {
          dispatch({
            type: actionTypes.GET_ALL,
            models: _get(response, 'data.models')
          });
          resolve();
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });
    });
  };
}
