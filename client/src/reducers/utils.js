import {
  GET_UTILS,
  GET_UTIL,
  UTIL_ERROR,
  ADD_UTIL,
  DELETE_UTIL,
  UPDATE_UTIL

} from '../actions/types';

const initialState = {
  utils: [],
  util: null,
  loading: true,
  error: {},
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case GET_UTILS:
      return {
        ...state,
        utils: payload,
        loading: false
      };
      case GET_UTIL:
        return {
          ...state,
          util: payload,
          loading: false
        };
      case ADD_UTIL:
       return {
         ...state,
         util: [payload, ...state.util],
         loading: false
       };
       case UPDATE_UTIL:
        return {
          ...state,
          util: payload,
          loading: false
        };
      case DELETE_UTIL:
        return {
          ...state,
          utils: state.utils.filter(util => util._id !== payload),
          loading: false
        };
        case UTIL_ERROR:
          return {
            ...state,
            error: payload,
            loading: false
          };
        default:
        return state;
  }
}
