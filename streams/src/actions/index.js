import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
  EDIT_STREAM,
} from "./types";
import streams from "../apis/streams";
import history from '../history';
 
export const SignIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const SignOut = () => {
  return {
    type: SIGN_OUT,
  };
};

// getState() returns state of object in value

export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post("/streams", { ...formValues, userId });
  console.log(response);
  dispatch({ type: CREATE_STREAM, payload: response.data });
  history.push('/');
};

// use patch adn not put as put REPLACES all properties of object with passed ,
// so some properties can be deleted

export const editStream = (id, formValues) => async (dispatch) => {
  const response = await streams.patch(`/streams/${id}`, formValues);
  console.log(response);
  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push("/");
};

export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get("/streams");
  console.log(response);
  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);
  console.log(response);
  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const deleteStream = (id) => async (dispatch) => {
  const response = await streams.delete(`/streams/${id}`);
  console.log(response);
  dispatch({ type: DELETE_STREAM, payload: id });
  history.push("/");
};
