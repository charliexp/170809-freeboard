import update from 'immutability-helper';
import * as types from 'actions/ActionTypes';

const initialState = {
  list: {
    status: 'INIT',
    error: null,
    data : [],
    postId: 1
  }
};

export default function move(state = initialState, action = {}) {
  switch(action.type) {
    case types.FAKE_FETCH:
      return update(state, {
        list: {
          status: { $set: 'WAITING' },
          error: { $set: null }
        }
      });
    case types.FAKE_FETCH_SUCCESS:
      return update(state, {
        list: {
          status: { $set: 'SUCCESS' },
          data: { $set: action.data },
          postId: { $set: action.postId }
        }
      });
    case types.FAKE_FETCH_FAILURE:
      return update(state, {
        list: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    default:
      return state;
  }
}
