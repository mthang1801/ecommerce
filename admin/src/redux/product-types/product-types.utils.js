export const eidtProductTypes = (productTypesList, editedProduct) => {
  return productTypesList.map((productType) => {
    if (productType._id.toString() === editedProduct._id.toString()) {
      productType = { ...editedProduct };
    }
    return productType;
  });
};
