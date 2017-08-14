import update from 'immutability-helper';
import ApiRequest, { GET_FAKE_DATA } from 'lib/APIListNRequester';
import * as types from './ActionTypes';

export function fakeRequest(postId = 1) {
  return (dispatch, getState) => {
    dispatch(fakeFetch());

    return ApiRequest(update(GET_FAKE_DATA, {
        PathParameters: {
          postId : { $set: postId }
        }
      }))
      .then(response => {
        dispatch(fakeFetchSuccess(response, postId));
      })
      .catch(error => {
        dispatch(fakeFetchFailure(error));
      });
  };
}

export function fakeFetch() {
  return {
    type: types.FAKE_FETCH
  };
}

export function fakeFetchSuccess(data, postId) {
  return {
    type: types.FAKE_FETCH_SUCCESS,
    data,
    postId
  };
}

export function fakeFetchFailure(error) {
  return {
    type: types.FAKE_FETCH_FAILURE,
    error
  };
}
