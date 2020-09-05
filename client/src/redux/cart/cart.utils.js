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
  cartItems.filter((item) => item._id !== itemToRemove._id);

export const decreaseCartItemUtility = (cartItems, itemToDecrease) =>
  cartItems.map((item) => {
    return item._id === itemToDecrease._id
      ? {
          ...item,
          quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
        }
      : item;
  });

export const increaseCartItemUtility = (cartItems, itemToIncrease) =>
  cartItems.map((item) => {
    return item._id === itemToIncrease._id
      ? { ...item, quantity: item.quantity + 1 }
      : item;
  });
