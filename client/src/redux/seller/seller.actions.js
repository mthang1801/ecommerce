import sellerActionTypes from "./seller.types";

export const saveRegisterForm = (obj) => {
  return {
    type: sellerActionTypes.SAVE_REGISTER_FORM,
    payload: obj,
  };
};

export const saveProductForm = (obj) => ({
  type: sellerActionTypes.SAVE_PRODUCT_FORM,
  payload: obj,
});

export const clearAll = () => ({
  type: sellerActionTypes.CLEAR_ALL,
});
