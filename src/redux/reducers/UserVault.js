import { SET_USER_VAULT } from "../action.type";

const initialState = [{}];

const UserVaultReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_VAULT:
      return action.payload;
    default:
      return state;
  }
};

export default UserVaultReducer;
