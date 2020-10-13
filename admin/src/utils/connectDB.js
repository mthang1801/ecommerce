import axios from "axios";
import urls from "./urls";
export const getMenu = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(urls.GET_PRODUCT_CATEGORY_MENU);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const createMenu = (dataJSON) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(urls.POST_CREATE_MENU_FILE, {
        data: JSON.parse(dataJSON),
      });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
export const updateManufactor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(urls.UPDATE_MANUFACTOR);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
export const getProductList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(urls.GET_PRODUCT_LIST);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
export const updateLinkUrl = (productList) => {
  return new Promise(async (resolve, reject) => {
    try {
      productList = JSON.parse(productList);
      let newProductList = [];
      for (let [index, product] of productList.entries()) {
        if (index < 100) {
          let decodeLinkUrl = decodeURIComponent(product.linkUrl);
          let splitLinkUrl = decodeLinkUrl.split("/");
          let rootLink = splitLinkUrl.slice(0, 3).join("/");
          let pathWithoutSpecialCharacter = product.name
            .toLowerCase()
            .replace(/[^\w\s]/gi, "");
          let productPath = encodeURIComponent(pathWithoutSpecialCharacter);
          product.linkUrl = `${rootLink}/${productPath}`;
          console.log(product.linkUrl);
          newProductList.push(product);
        }
      }

      const { data } = await axios.put(urls.UPDATE_PRODUCT_LIST, {
        productList: newProductList,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const updateFileImages = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.post(urls.UPDATE_FILE_IMAGES);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
