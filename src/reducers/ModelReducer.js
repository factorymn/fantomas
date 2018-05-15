// Model
import * as actionTypes from '../constants/ModelConstants';

const initialState = {
  models: {},
};

export default function ModelReducer(state = initialState, action) {
 const { type, models } = action;

 switch (type) {
   case actionTypes.ADD: {
     return {
       ...state,
       models,
     };
   }
   case actionTypes.UPDATE: {
     return {
       ...state,
       models,
     };
   }
   case actionTypes.REMOVE: {
     return {
       ...state,
       models,
     };
   }
   case actionTypes.GET_ALL: {
     return {
       ...state,
       models,
     };
   }

   default:
     return state;
 }
}
