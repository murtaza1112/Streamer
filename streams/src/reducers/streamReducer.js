import {
  FETCH_STREAM,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
  FETCH_STREAMS,
} from "../actions/types";
import _ from "lodash";

//store state in the form of an object rather than array as no need to explicitly find element
//using map, key interpolation syntax far easier
//omit creates a new object anyway
//mapkeys converts an array to object with object key being second arg prop
const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case DELETE_STREAM:
        return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default streamReducer;
