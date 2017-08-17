import update from 'immutability-helper';
import * as types from 'actions/ActionTypes';

const initialState = {
  status: 'INIT',
  response: null,
  error: null,
};

export default function(state = initialState, action = {}) {
  switch(action.type) {
    // write
    case types.BOARD_WRITE:
      return update(state, {
        status: { $set: 'WRITE_WAITING' },
        response: { $set: null },
        error: { $set: null }
      });
    case types.BOARD_WRITE_SUCCESS:
      return update(state, {
        status: { $set: 'WRITE_SUCCESS' },
        response: { $set: action.response }
      });
    case types.BOARD_WRITE_FAILURE:
      return update(state, {
        status: { $set: 'WRITE_FAILURE' },
        error: { $set: action.error }
      });

    // read
    case types.BOARD_READ:
      return update(state, {
        status: { $set: 'READ_WAITING' },
        response: { $set: null },
        error: { $set: null }
      });
    case types.BOARD_READ_SUCCESS:
      return update(state, {
        status: { $set: 'READ_SUCCESS' },
        response: { $set: action.response }
      });
    case types.BOARD_READ_FAILURE:
      return update(state, {
        status: { $set: 'READ_FAILURE' },
        error: { $set: action.error }
      });

    // check auth
    /** @desc 권한 체크시에는 response를 리셋하면 기존 읽기 모드에서 보고 있던 내용이 날아감. 어차피 response를 사용하지 않으므로 리셋하지 않도록 함.*/
    case types.BOARD_AUTH:
      return update(state, {
        status: { $set: 'AUTH_WAITING' },
        //response: { $set: null },
        error: { $set: null }
      });
    case types.BOARD_AUTH_SUCCESS:
      return update(state, {
        status: { $set: 'AUTH_SUCCESS' },
        //response: { $set: action.response }
      });
    case types.BOARD_AUTH_FAILURE:
      return update(state, {
        status: { $set: 'AUTH_FAILURE' },
        error: { $set: action.error }
      });

    // modify
    case types.BOARD_MODIFY:
      return update(state, {
        status: { $set: 'MODIFY_WAITING' },
        response: { $set: null },
        error: { $set: null }
      });
    case types.BOARD_MODIFY_SUCCESS:
      return update(state, {
        status: { $set: 'MODIFY_SUCCESS' },
        response: { $set: action.response }
      });
    case types.BOARD_MODIFY_FAILURE:
      return update(state, {
        status: { $set: 'MODIFY_FAILURE' },
        error: { $set: action.error }
      });

    // delete
    case types.BOARD_DELETE:
      return update(state, {
        status: { $set: 'DELETE_WAITING' },
        response: { $set: null },
        error: { $set: null }
      });
    case types.BOARD_DELETE_SUCCESS:
      return update(state, {
        status: { $set: 'DELETE_SUCCESS' },
        response: { $set: action.response }
      });
    case types.BOARD_DELETE_FAILURE:
      return update(state, {
        status: { $set: 'DELETE_FAILURE' },
        error: { $set: action.error }
      });

    // list
    case types.BOARD_LIST:
      return update(state, {
        status: { $set: 'LIST_WAITING' },
        response: { $set: null },
        error: { $set: null }
      });
    case types.BOARD_LIST_SUCCESS:
      return update(state, {
        status: { $set: 'LIST_SUCCESS' },
        response: { $set: action.response }
      });
    case types.BOARD_LIST_FAILURE:
      return update(state, {
        status: { $set: 'LIST_FAILURE' },
        error: { $set: action.error }
      });
    default:
      return state;
  }
}
