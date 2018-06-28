// Data
import * as actionTypes from '../constants/DataConstants';

const initialState = {
};

export default function DataReducer(state = initialState, action) {
 const { type, ...data } = action;

 switch (type) {
   case actionTypes.GET_ALL: {
     return {
       ...state,
       ...data,
     };
   }
   case actionTypes.GET_ONE: {
     return {
       ...state,
       ...data,
     };
   }
   case actionTypes.CREATE: {
     return {
       ...state,
       ...data,
     };
   }
   case actionTypes.UPDATE: {
     return {
       ...state,
       ...data,
     };
   }
   case actionTypes.DELETE: {
     return {
       ...state,
       ...data,
     };
   }
   case actionTypes.UPLOAD: {
     return {
       ...state,
       ...data,
     };
   }

   default:
     return state;
 }
}
