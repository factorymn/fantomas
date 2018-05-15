import * as actionTypes from '../constants/PageConstants';

export function start() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_START
    });
  };
}

export function end() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_END
    });
  };
}

export function fail() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_FAIL
    });
  };
}

export function success() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.REQUEST_SUCCESS
    });
  };
}

export function hideSnackbar() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SNACKBAR_HIDE
    });
  };
}
