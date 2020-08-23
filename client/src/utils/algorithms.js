import CATEGORIES_DATA from "../data/category";
import PRODUCTS_DATA from "../data/products";
import SELLERS_DATA from "../data/sellers";
import CART_DATA from "../data/cart";
import axios from "axios";
import urls from "./urls";
export const getLatestProducts = () => {
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

export const getProductsPerpage = (
  page = 1,
  viewport = "desktop",
  sort = "ascending"
) => {
  let NUM_PRODUCTS_PER_PAGE;
  switch (viewport) {
    case "mobileView":
      NUM_PRODUCTS_PER_PAGE = 3;
      break;
    case "tabletView":
      NUM_PRODUCTS_PER_PAGE = 6;
      break;
    default:
      NUM_PRODUCTS_PER_PAGE = 12;
  }
  let sellers = [...SELLERS_DATA];
  return sellers.filter(
    (_, idx) =>
      idx >= (page - 1) * NUM_PRODUCTS_PER_PAGE &&
      idx < page * NUM_PRODUCTS_PER_PAGE
  );
};

export const getCartItems = () => {
  return [...CART_DATA];
};

// export const getCategoryList = () => {
//   return Object.keys(CATEGORIES_DATA).map((key) => CATEGORIES_DATA[key]);
// };

export const getProductsByProductType = (productType) => {
  return PRODUCTS_DATA[productType];
};

//========================================

export const getListCities = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(urls.LIST_CITIES_API);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const getListDistricts = (cityID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(
        urls.LIST_DISTRICTS_BASE_ON_CITY_ID_API(cityID)
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const getListWards = (districtID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(
        urls.LIST_WARDS_BASE_ON_DISRICT_ID_API(districtID)
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const getListCategory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(urls.GET_LIST_CATEGORY);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const getListProductType = (categoryID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(
        urls.GET_LIST_PRODUCT_TYPE__BY_CATEGORYID(categoryID)
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const registerAsSeller = (registerForm) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.put(
        urls.UPDATE_ROLE_USER_AS_SELLER,
        registerForm
      );
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export const createNewProduct = (product) => {
  return new Promise(async (resolve, reject) => {
    try {
      let formData = new FormData();
      formData.append("categoryId", product.selectedCategory._id);
      formData.append("productTypeId", product.selectedProductType._id);
      formData.append("rootUrl", product.selectedProductType.linkUrl);
      formData.append("name", product.name);
      formData.append("tags", product.tags);
      formData.append("price", product.price);
      formData.append("discount", product.discount || 0);
      formData.append("discountExpDate", product.discountExpDate);
      formData.append("description", product.description);
      formData.append("information", product.information);
      formData.append("manufactor", product.manufactor);
      for (let file of product.image) {
        formData.append("multiple-images", file);
      }

      const { data } = await axios.post(urls.POST_CREATE_NEW_PRODUCT, formData);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
