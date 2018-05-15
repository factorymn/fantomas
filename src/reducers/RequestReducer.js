 // Page
import * as actionTypes from '../constants/PageConstants';

const initialState = {
  message: '',
  loading: false,
  snackbar: false
};

export default function RequestReducer(state = initialState, action) {
  const { type, message } = action;

  switch (type) {
    case actionTypes.REQUEST_START: {
      return {
        ...state,
        message,
        loading: true,
        snackbar: true
      };
    }
    
    case actionTypes.REQUEST_END: {
      return {
        ...state,
        message,
        loading: false,
        snackbar: true
      };
    }
    
    case actionTypes.REQUEST_SUCCESS: {
      return {
        ...state,
        message,
        loading: false,
        snackbar: true
      };
    }

    case actionTypes.REQUEST_FAIL: {
      return {
        ...state,
        message,
        loading: false,
        snackbar: true
      };
    }

    case actionTypes.SNACKBAR_HIDE: {
      return {
        ...state,
        snackbar: false
      };
    }

    default:
      return state;
  }
}
