import { SET_USER_VAULT } from "../action.type";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_VAULT:
      return [action.payload];
    default:
      return state;
  }
};
