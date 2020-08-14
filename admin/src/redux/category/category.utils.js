export const editCategory = (categoryList, category) => {
  return categoryList.map((categoryItem) => {
    if (categoryItem._id.toString() === category._id.toString()) {
      categoryItem = { ...category };
    }
    return categoryItem;
  });
};

export const removeCategory = (categoryList, categoryId) => {
  return categoryList.filter(
    (categoryItem) => categoryItem._id.toString() !== categoryId.toString()
  );
};
