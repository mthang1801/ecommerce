export const editProduct = (productsList, editedProduct) => {
  return productsList.map((product) => {
    if (product._id.toString() === editedProduct._id.toString()) {
      product = { ...editedProduct };
    }
    return product;
  });
};
