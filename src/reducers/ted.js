import {
  FETCH_TAGS_REQUEST, FETCH_TAGS_SUCCESS, FETCH_TAGS_FAILURE
} from '../actions/ted';

export default function ted(state = {
  isFetching: false,
}, action) {
  switch (action.type) {
    case FETCH_TAGS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_TAGS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        tags: action.tags
      });
    case FETCH_TAGS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message,
      });
  
    default:
      return state;
  }
}
 