import { SET_USER_VAULT } from "../action.type";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_VAULT:
      const { password_vault } = action.payload;
      return { ...state, password_vault };
    default:
      return state;
  }
};
