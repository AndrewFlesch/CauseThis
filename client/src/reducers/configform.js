import {
  GET_CONFIGFORMS,
  GET_CONFIGFORM,
  CONFIGFORM_ERROR,
  ADD_CONFIGFORM,
  DELETE_CONFIGFORM,
  UPDATE_CONFIGFORM

} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case GET_CONFIGFORMS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
      case GET_CONFIGFORM:
        return {
          ...state,
          post: payload,
          loading: false
        };
      case ADD_CONFIGFORM:
       return {
         ...state,
         posts: [payload, ...state.posts],
         loading: false
       };
       case UPDATE_CONFIGFORM:
        return {
          ...state,
          posts: state.posts.filter(post => post._id !== payload),
          loading: false
        };
      case DELETE_CONFIGFORM:
        return {
          ...state,
          posts: state.posts.filter(post => post._id !== payload),
          loading: false
        };
        case CONFIGFORM_ERROR:
          return {
            ...state,
            error: payload,
            loading: false
          };
        default:
        return state;
  }
}
