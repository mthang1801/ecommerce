export const editCategory = (productGroupsList, editedProduct) => {
  return productGroupsList.map((productGroup) => {
    if (productGroup._id.toString() === editedProduct._id.toString()) {
      productGroup = { ...editedProduct };
    }
    return productGroup;
  });
};
