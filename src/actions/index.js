import streams from "../apis/streams";
import * as type from "./types";
import history from "../history";

export const signIn = userId => {
  return {
    type: type.SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: type.SIGN_OUT
  };
};

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post("/streams", { ...formValues, userId });
  dispatch({ type: type.CREATE_STREAM, payload: response.data });
  history.push("/");
};

export const fetchStreams = () => async dispatch => {
  const response = await streams.get("/streams");
  dispatch({ type: type.FETCH_STREAMS, payload: response.data });
};

export const fetchStream = streamId => async dispatch => {
  const response = await streams.get(`/streams/${streamId}`);
  dispatch({ type: type.FETCH_STREAM, payload: response.data });
};

export const editStream = (streamId, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${streamId}`, formValues);
  dispatch({ type: type.EDIT_STREAM, payload: response.data });
  history.push("/");
};

export const deleteStream = streamId => async dispatch => {
  await streams.delete(`/streams/${streamId}`);
  dispatch({ type: type.DELETE_STREAM, payload: streamId });
  history.push("/");
};
