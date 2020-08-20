import sellerActionTypes from "./seller.types";

export const saveRegisterForm = (key, value) => {
  console.log(key, value);
  return {
    type: sellerActionTypes.SAVE_REGISTER_FORM,
    payload: { key, value },
  };
};

export const saveProductForm = (product) => ({
  type: sellerActionTypes.SAVE_PRODUCT_FORM,
  payload: product,
});

export const clearAll = () => ({
  type: sellerActionTypes.CLEAR_ALL,
});
