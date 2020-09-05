export const addItemToCartUtility = (cartItems, itemToAdd, quantity) => {
  const checkExistedCartItem = cartItems.find(
    (item) => item._id === itemToAdd._id
  );
  if (!checkExistedCartItem) return [...cartItems, { ...itemToAdd, quantity }];
  return cartItems.map((item) => {
    return item._id === itemToAdd._id ? { ...item, quantity } : item;
  });
};

export const removeCartItemUtility = (cartItems, itemToRemove) =>
  cartItems.filter((item) => item.id !== itemToRemove.id);

export const decreaseCartItemUtility = (cartItems, itemToDecrease) => {
  let newCartItems = [];
  console.log(cartItems);
  console.log(itemToDecrease);
  cartItems.forEach((item, idx) => {
    if (item._id == itemToDecrease._id) {
      if (item.quantity > 1) {
        item.quantity = item.quantity - 1;
        newCartItems = [...newCartItems, { ...item }];
      }
    }
  });
  return newCartItems;
};

export const increaseCartItemUtility = (cartItems, itemToIncrease) =>
  cartItems.map((item) => {
    return item.id === itemToIncrease.id
      ? { ...item, quantity: item.quantity + 1 }
      : item;
  });
