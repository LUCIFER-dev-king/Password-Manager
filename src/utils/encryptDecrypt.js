const aes256 = require("aes256");

export const encryptValues = async (key, value) => {
  return await aes256.encrypt(key, value);
};

export const decryptValues = async (key, value) => {
  return await aes256.decrypt(key, value);
};

export const checkObjIsEmpty = (obj) => {
  if (obj && Object.keys(obj) > 0) {
    //
  }
};
