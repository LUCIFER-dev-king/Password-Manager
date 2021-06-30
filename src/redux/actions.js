import { SET_USER_VAULT } from "./action.type";

export const setUserVault = (vault) => ({
  type: SET_USER_VAULT,
  payload: vault,
});
