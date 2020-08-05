import CATEGORIES_DATA from "../data/category";
import PRODUCTS_DATA from "../data/products";
import SELLERS_DATA from "../data/sellers";

export const getLastestProducts = () => {
  let sellers = [...SELLERS_DATA];
  sellers.sort((a, b) => {
    if (Date.parse(a.createdAt) > Date.parse(b.createdAt)) return -1;
  });
  let checkProductIsTheSame = {};
  let j = 0;
  let len = 6;
  let result = [];
  if (sellers.length <= 6) {
    return sellers;
  }
  console.log(sellers.slice(0, 10));
  for (let i = 0; i < len; i++) {
    if (checkProductIsTheSame[sellers[i].productId]) {
      sellers[i] = sellers[len + j];
      j++;
      i--;
    } else {
      checkProductIsTheSame[sellers[i].productId] = true;
      result.push(sellers[i]);
    }
  }
  console.log(checkProductIsTheSame);
  return result;
};

export const getProductsBestSeller = () => {
  let sellers = [...SELLERS_DATA];
  sellers = sellers
    .filter(
      (seller) =>
        Math.ceil((Date.now() - Date.parse(seller.createdAt)) / 84600000) <
          14 && seller.votes > 4
    )
    .sort((a, b) => b.sold - a.sold);
  return sellers.slice(0, 6);
};

export const getProductsTopRated = () => {
  let sellers = [...SELLERS_DATA];
  sellers.sort((a, b) => {
    if (a.votes > b.votes) return -1;
  });
  return sellers.slice(0, 9);
};

export const getProductsListByCategoryId = (categeryId) => {
  const categories = { ...CATEGORIES_DATA };
  const listProductsId = categories[categeryId].products;
  const products = { ...PRODUCTS_DATA };
  let productsList = {};
  listProductsId.length &&
    listProductsId.forEach((productId) => {
      productsList[productId] = products[productId];
    });
  return productsList;
};
