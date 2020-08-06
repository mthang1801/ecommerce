import CATEGORIES_DATA from "../data/category";
import PRODUCTS_DATA from "../data/products";
import SELLERS_DATA from "../data/sellers";
import CART_DATA from "../data/cart";
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

export const getCategoryData = () => {
  const categoryList = { ...CATEGORIES_DATA };
  return Object.keys(categoryList).map((key) => categoryList[key]);
};

export const getMaxPrice = () => {
  const sellers = [...SELLERS_DATA];
  let max = sellers[0].price;
  sellers.forEach((seller) => {
    if (seller.price > max) {
      max = seller.price;
    }
  });
  return max;
};

export const getSaleOffProducts = () => {
  let sellers = [...SELLERS_DATA];
  sellers = sellers.filter((seller) => seller.discount > 0);
  sellers.sort((a, b) => {
    if (a.discount > b.discount) {
      return -1;
    }
    return 1;
  });
  return sellers;
};

export const getNumberOfProducts = () => {
  let sellers = [...SELLERS_DATA];
  return sellers.length;
};

export const getProductsPerpage = (page, sort = "ascending") => {
  const NUMBER_PRODUCTS_PER_PAGE = 12;
  let sellers = [...SELLERS_DATA];
  return sellers.filter(
    (_, idx) =>
      idx >= (page - 1) * NUMBER_PRODUCTS_PER_PAGE &&
      idx < page * NUMBER_PRODUCTS_PER_PAGE
  );
};

export const getCartItems = () => {
  return [...CART_DATA];
};
