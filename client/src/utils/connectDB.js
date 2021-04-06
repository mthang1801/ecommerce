import CATEGORIES_DATA from "../data/category";
import PRODUCTS_DATA from "../data/products";
import SELLERS_DATA from "../data/sellers";
import CART_DATA from "../data/cart";
import axios from "axios";
import urls from "./urls";
import {api} from "./api"

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
        urls.GET_LIST_PRODUCT_TYPE_BY_CATEGORYID(categoryID)
      );

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
export const getListProductGroup = (productTypeID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(
        urls.GET_LIST_PRODUCT_GROUP_BY_PRODUCTTYPEID(productTypeID)
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
      formData.append("portfolioId", product.selectedPortfolio._id);
      formData.append("categoryId", product.selectedCategory._id);     
      formData.append(
        "productGroupId", product.selectedProductGroup?._id)    
      formData.append("manufactorId", product.selectedManufactor?._id);
      formData.append("manufactorName", product.selectedManufactor?.name);
      formData.append("name", product.name);
      formData.append("price", product.price);      
      formData.append("discount", product.discount || 0);
      formData.append("discountExpDate", product.discountExpDate);
      formData.append("origin", product.origin);
      formData.append("description", product.description);
      formData.append("information", product.information);
      formData.append("manufactor", product.manufactor);
      formData.append("weight", +product.weight);
      formData.append("quantity", +product.quantity);
      formData.append("ship_fee", +product.ship_fee);
      
      for (let file of product.image) {
        formData.append("multiple-images", file);
      }

      const { data } = await axios.post(api.POST_PRODUCT, formData);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export const getLatestProducts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(urls.GET_LATEST_PRODUCTS);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const getBestSellerProducts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(urls.GET_BEST_SELLER_PRODUCTS);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const getTopRatedProducts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(urls.GET_TOP_RATED_PRODUCTS);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const getCategoryList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(urls.GET_CATEGORY_LIST);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const getProductListByPageNumber = (page) => {
  return new Promise(async (resolve, reject) => {
    try {
    } catch (error) {
      reject(error);
    }
  });
};

export const postCODPayment = (
  currentUser,
  cartItems,
  methodDelivery,
  userMessage,
  totalPrice
) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(methodDelivery);
      const { data } = await axios.post(urls.POST_COD_PAYMENT, {
        currentUser,
        cartItems,
        methodDelivery,
        userMessage,
        totalPrice,
      });
      resolve(data);
    } catch (error) {
      reject(error.response.data.message);
    }
  });
};

export const postCardPayment = (
  currentUser,
  cartItems,
  methodDelivery,
  userMessage,
  totalPrice,
  token
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(urls.POST_CARD_PAYMENT, {
        currentUser,
        cartItems,
        methodDelivery,
        userMessage,
        totalPrice,
        token,
      });
      resolve(data);
    } catch (error) {
      reject(error.response.data.message);
    }
  });
};
export const postReviewsProduct = (productId, stars, comment) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(urls.POST_REVIEWS_PRODUCT(productId), {
        stars,
        comment,
      });
      resolve(true);
    } catch (error) {
      reject(error.response.data.message);
    }
  });
};
export const updateReviewsProduct = (
  productId,
  stars,
  comment,
  updatedMyReview
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.put(urls.UPDATE_REVIEWS_PRODUCT(productId), {
        stars,
        comment,
        updatedMyReview: { ...updatedMyReview },
      });
      resolve(data);
    } catch (error) {
      reject(error.response.data.message);
    }
  });
};
export const getCommentReviewsByProductId = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(
        urls.GET_PRODUCT_COMMENT_REVIEWS(productId)
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchPortfolios = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const {data} = await axios.get(api.FETCH_ADMIN_PORTFOLIOS);
      resolve(data)
    } catch (error) {
      reject(error);
    }
  })
}

export const fetchCategoriesByPortfolio = (portfolioId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {data} = await axios.get(api.FETCH_CATEGORIES_BY_PORTFOLIO(portfolioId));
      resolve(data);
    } catch (error) {
      reject(error);
    }
  })
}

export const fetchManufactorsByPortfolio = (portfolioId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {data} = await axios.get(api.FETCH_MANUFACTORS_BY_PORTFOLIO(portfolioId));
      resolve(data);
    } catch (error) {
      reject(error);
    }
  })
}

export const fetchProductGroupsByCategory = (categoryId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {data} = await axios.get(api.FETCH_PRODUCT_GROUPS_BY_CATEGORY(categoryId));
      resolve(data);
    } catch (error) {
      reject(error);
    }
  })
}