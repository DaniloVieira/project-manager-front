import { updateObject } from '../../Shared/utility';
import * as actionTypes from '../actionTypes';

const defaultTitle = '[>>> THE TITLE IS MISSING <<<]';

const initialState = {
  title: defaultTitle,
  // count: 5,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TITLE:
      return updateObject(state, { title: action.title });
    // case actionTypes.INCREMENT_COUNT:
    //   return updateObject(state, { count: state.count + 1 });
    // case actionTypes.DECREMENT_COUNT:
    //   return updateObject(state, { count: state.count - 1 });
    default:
      //return updateObject(state, { title: defaultTitle });
      return state;
  }
};

export default reducer;
