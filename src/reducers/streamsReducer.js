import * as type from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case type.FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case type.FETCH_STREAM:
    case type.CREATE_STREAM:
    case type.EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case type.DELETE_STREAM:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
