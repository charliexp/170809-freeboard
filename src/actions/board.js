import update from 'immutability-helper';
import ApiRequest, { AUTH_BOARD, DELETE_BOARD, DELETE_COMMENT, LIST_BOARD, MODIFY_BOARD, READ_BOARD, WRITE_BOARD, WRITE_COMMENT } from 'lib/APIListNRequester';
import * as types from './ActionTypes';

// write board
export function writeBoard(data) {
  return (dispatch, getState) => {
    dispatch(boardWrite());

    return ApiRequest(update(WRITE_BOARD, {
        QueryParameters: {
          writer: { $set: data.writer },
          title: { $set: data.title },
          content: { $set: data.content },
          password: { $set: data.password }
        }
      }))
      .then(response => {
        dispatch(boardWriteSuccess(response));
      })
      .catch(error => {
        dispatch(boardWriteFailure(error));
      });
  };
}

export function boardWrite() {
  return {
    type: types.BOARD_WRITE
  };
}

export function boardWriteSuccess(response) {
  return {
    type: types.BOARD_WRITE_SUCCESS,
    response
  };
}

export function boardWriteFailure(error) {
  return {
    type: types.BOARD_WRITE_FAILURE,
    error
  };
}

// read board
export function readBoard(id, type) {
  return (dispatch, getState) => {
    dispatch(boardRead());

    return ApiRequest(update(READ_BOARD, {
        PathParameters: {
          id: { $set: id },
          type: { $set: type }
        }
      }))
      .then(response => {
        dispatch(boardReadSuccess(response));
      })
      .catch(error => {
        dispatch(boardReadFailure(error));
      });
  };
}

export function boardRead() {
  return {
    type: types.BOARD_READ
  };
}

export function boardReadSuccess(response) {
  return {
    type: types.BOARD_READ_SUCCESS,
    response
  };
}

export function boardReadFailure(error) {
  return {
    type: types.BOARD_READ_FAILURE,
    error
  };
}

// check auth
export function authBoard(id, password) {
  return (dispatch, getState) => {
    dispatch(boardAuth());

    return ApiRequest(update(AUTH_BOARD, {
        QueryParameters: {
          id: { $set: id },
          password: { $set: password }
        }
      }))
      .then(response => {
        dispatch(boardAuthSuccess(response));
      })
      .catch(error => {
        dispatch(boardAuthFailure(error));
      });
  };
}

export function boardAuth() {
  return {
    type: types.BOARD_AUTH
  };
}

export function boardAuthSuccess(response) {
  return {
    type: types.BOARD_AUTH_SUCCESS,
    response
  };
}

export function boardAuthFailure(error) {
  return {
    type: types.BOARD_AUTH_FAILURE,
    error
  };
}

// modify board
export function modifyBoard(id, writer, title, content, password) {
  return (dispatch, getState) => {
    dispatch(boardModify());

    return ApiRequest(update(MODIFY_BOARD, {
        PathParameters: {
          id: { $set: id }
        },
        QueryParameters: {
          writer: { $set: writer },
          title: { $set: title },
          content: { $set: content },
          password: { $set: password }
        }
      }))
      .then(response => {
        dispatch(boardModifySuccess(response));
      })
      .catch(error => {
        dispatch(boardModifyFailure(error));
      });
  };
}

export function boardModify() {
  return {
    type: types.BOARD_MODIFY
  };
}

export function boardModifySuccess(response) {
  return {
    type: types.BOARD_MODIFY_SUCCESS,
    response
  };
}

export function boardModifyFailure(error) {
  return {
    type: types.BOARD_MODIFY_FAILURE,
    error
  };
}

// delete board
export function deleteBoard(id, password) {
  return (dispatch, getState) => {
    dispatch(boardDelete());

    return ApiRequest(update(DELETE_BOARD, {
        PathParameters: {
          id: { $set: id }
        },
        QueryParameters: {
          password: { $set: password }
        }
      }))
      .then(response => {
        dispatch(boardDeleteSuccess(response));
      })
      .catch(error => {
        dispatch(boardDeleteFailure(error));
      });
  };
}

export function boardDelete() {
  return {
    type: types.BOARD_DELETE
  };
}

export function boardDeleteSuccess(response) {
  return {
    type: types.BOARD_DELETE_SUCCESS,
    response
  };
}

export function boardDeleteFailure(error) {
  return {
    type: types.BOARD_DELETE_FAILURE,
    error
  };
}

// list board
export function listBoard(page, perPage) {
  return (dispatch, getState) => {
    dispatch(boardList());

    return ApiRequest(update(LIST_BOARD, {
        PathParameters: {
          page: { $set: page },
          perPage: { $set: perPage }
        }
      }))
      .then(response => {
        dispatch(boardListSuccess(response));
      })
      .catch(error => {
        dispatch(boardListFailure(error));
      });
  };
}

export function boardList() {
  return {
    type: types.BOARD_LIST
  };
}

export function boardListSuccess(response) {
  return {
    type: types.BOARD_LIST_SUCCESS,
    response
  };
}

export function boardListFailure(error) {
  return {
    type: types.BOARD_LIST_FAILURE,
    error
  };
}

// write comment
export function writeComment(data) {
  return (dispatch, getState) => {
    dispatch(commentWrite());
    console.log('writeComment', data);
    return ApiRequest(update(WRITE_COMMENT, {
        PathParameters: {
          id: { $set: data.id },
        },
        QueryParameters: {
          writer: { $set: data.writer },
          content: { $set: data.content },
          password: { $set: data.password }
        }
      }))
      .then(response => {
        dispatch(commentWriteSuccess(response));
      })
      .catch(error => {
        dispatch(commentWriteFailure(error));
      });
  };
}

export function commentWrite() {
  return {
    type: types.BOARD_COMMENT_WRITE
  };
}

export function commentWriteSuccess(response) {
  return {
    type: types.BOARD_COMMENT_WRITE_SUCCESS,
    response
  };
}

export function commentWriteFailure(error) {
  return {
    type: types.BOARD_COMMENT_WRITE_FAILURE,
    error
  };
}

// delete comment
export function deleteComment(id, commentId, password) {
  return (dispatch, getState) => {
    dispatch(commentDelete());

    return ApiRequest(update(DELETE_COMMENT, {
        PathParameters: {
          id: { $set: id },
          commentId: { $set: commentId }
        },
        QueryParameters: {
          password: { $set: password }
        }
      }))
      .then(response => {
        dispatch(commentDeleteSuccess(response));
      })
      .catch(error => {
        dispatch(commentDeleteFailure(error));
      });
  };
}

export function commentDelete() {
  return {
    type: types.BOARD_COMMENT_DELETE
  };
}

export function commentDeleteSuccess(response) {
  return {
    type: types.BOARD_COMMENT_DELETE_SUCCESS,
    response
  };
}

export function commentDeleteFailure(error) {
  return {
    type: types.BOARD_COMMENT_DELETE_FAILURE,
    error
  };
}
