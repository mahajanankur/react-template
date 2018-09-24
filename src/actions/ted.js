export const FETCH_TAGS_REQUEST = 'FETCH_TAGS_REQUEST';
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
export const FETCH_TAGS_FAILURE = 'FETCH_TAGS_FAILURE';

import * as Constants from '../constants';

function requestFetchTags() {
  return {
    type: FETCH_TAGS_REQUEST,
    isFetching: true,
  };
}

function fetchTagsSuccess(tags) {
  return {
    type: FETCH_TAGS_SUCCESS,
    isFetching: false,
    tags,
  };
}

function fetchTagsError(message) {
  return {
    type: FETCH_TAGS_FAILURE,
    isFetching: false,
    message,
  };
}


export function fetchUniqueTags() {
  const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  };

  return (dispatch) => {
    dispatch(requestFetchTags());

    return fetch(Constants.IP + '/tags', config)
      .then(response =>
        response.json().then(response => ({ tags: response.data, response })),
      ).then(({ tags, response }) => {
        if (!response.success) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(fetchTagsError(response.message));
          return Promise.reject(tags);
        }
        // Dispatch the success action
        dispatch(fetchTagsSuccess(tags));
      }).catch(err => console.log('Error: ', err.message));
  };
}