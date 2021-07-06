import { updateObject } from '../../Shared/utility';
import * as actionTypes from '../actionTypes';

const initialState = {
  count: 5,
  loadingColor: null,
  loading: false,
  fails: [],
  user: null,
  userLoading: false,
};

const reducerAction = {
  [actionTypes.INCREMENT_COUNT_START]: (state, action) =>
    updateObject(state, { loading: true, loadingColor: 'primary' }),

  [actionTypes.INCREMENT_COUNT]: (state, action) =>
    updateObject(state, { count: state.count + 1, loading: false }),

  [actionTypes.INCREMENT_COUNT_FAIL]: (state, action) => {
    const aux = state.fails;
    return updateObject(state, {
      fails: [...aux, { msg: 'falied increment' }],
    });
  },

  [actionTypes.DECREMENT_COUNT_START]: (state, action) =>
    updateObject(state, { loading: true, loadingColor: 'secondary' }),

  [actionTypes.DECREMENT_COUNT]: (state, action) =>
    updateObject(state, { count: state.count - 1, loading: false }),

  [actionTypes.DECREMENT_COUNT_FAIL]: (state, action) => {
    const aux = state.fails;
    return updateObject(state, {
      fails: [...aux, { msg: 'falied decrement' }],
    });
  },

  [actionTypes.EXAMPLE_AUTH_START]: (state, action) =>
    updateObject(state, { user: null, userLoading: true }),
  [actionTypes.EXAMPLE_AUTH_SUCCESS]: (state, action) =>
    updateObject(state, { user: action.payload, userLoading: false }),
  [actionTypes.EXAMPLE_AUTH_FAIL]: (state, action) =>
    updateObject(state, { user: null, userLoading: false }),
};

const reducer = (state = initialState, action) => {
  const f = reducerAction[action.type];
  const aux = f ? f(state, action) : state;
  return aux;
};

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case actionTypes.INCREMENT_COUNT_START:
//       return updateObject(state, { loading: true, loadingColor: 'primary' });
//     case actionTypes.INCREMENT_COUNT:
//       return updateObject(state, { count: state.count + 1, loading: false });
//     case actionTypes.INCREMENT_COUNT_FAIL:
//       const aux = state.fails;
//       return updateObject(state, {
//         fails: [...aux, { msg: 'falied increment' }],
//       });
//     case actionTypes.DECREMENT_COUNT_START:
//       return updateObject(state, { loading: true, loadingColor: 'secondary' });
//     case actionTypes.DECREMENT_COUNT:
//       return updateObject(state, { count: state.count - 1, loading: false });
//     case actionTypes.DECREMENT_COUNT_FAIL:
//       const aux2 = state.fails;
//       return updateObject(state, {
//         fails: [...aux2, { msg: 'falied increment' }],
//       });
//     default:
//       //return updateObject(state, { title: defaultTitle });
//       return state;
//   }
// };

export default reducer;
